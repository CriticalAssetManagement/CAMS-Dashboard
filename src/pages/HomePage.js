import React, {useState, useRef, useEffect, useContext} from "react"
import {Layout} from "../components/Layout"
import {ProgressBar, Button, Row, Toast, ToastContainer} from "react-bootstrap"
import {VAR_NAME} from "../components/constants"
import {WOQLClientObj} from '../init-woql-client'
import {QueryHook} from "../hooks/QueryHook"
import {getAvailableAssets} from "../hooks/queries"
import {extractAssetLocations} from "../components/utils"
import {MapHook} from "../hooks/MapHook"
import {Table} from "../components/Table"
import {Legend} from "../components/Legend"
import {getCriticalAssetConfig} from "../components/Views"
import {DEPENDENCY_RELATION_TYPE_TITLE, HOME_PAGE_TABLE_CSS, NO_DEPENDENCY_ALERT, SEARCH_ASSET} from "./constants"
import {MapToolBar} from "../components/MapToolBar"
import {SearchBar} from "../components/SearchBar"
import {DisplayMarkerInfo} from "../components/DisplayMarkerInfo"
import "leaflet-arrowheads"
import "leaflet.browser.print/dist/leaflet.browser.print.js"
//import "leaflet/dist/leaflet.css";
//import "leaflet.browser.print"
//import 'leaflet/dist/leaflet.css';
import {antPath} from 'leaflet-ant-path'
import {CRITICAL_LINKS, NON_CRITICAL_LINKS, NON_CRITICAL_COLOR, CRITICAL_COLOR} from "../components/constants"
import {LATITUDE, LONGITUDE, DASH_LINES_OPTIONS, MAP_ID, ARROW_OPTIONS, MARKER_OPTIONS, MAP_OPTIONS, POINTS, POLYGON, LAT, LNG, REFRESH, POPUP_OPTIONS}  from "../components/Maps/constants"

export const HomePage = () => {
    const [query, setQuery] = useState(false)
    const [showAssets, setShowAssets] = useState(false)
    const [resetMap, setResetMap] = useState(false)
    const [refresh, setRefresh]=useState(false)

    //map constants
    const [mapComponent, setMapComponent] = useState(false)

    const mapRef = useRef(MAP_ID)

    useEffect(() => {
        if(!showAssets) return
		map()
	}, [showAssets])

    const map = () => {
		const map = L.map(mapRef.current , MAP_OPTIONS)
        map.invalidateSize()

        setMapComponent(map)
        const tileLayer = new  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })

		tileLayer.addTo(map)
        // layer group
        var mg = L.layerGroup()
        loadMarkers (showAssets, mg, map)

        let options = {
            position: "topleft",
            title: "Print Map",
            printModes: ["Portrait", "Landscape", "Auto"]
        }

        var customActionToPrint = function(context, mode) {
            return function() {
                window.alert("We are printing the MAP. Let's do Custom print here!");
                context._printMode(mode);
            }
        };

        L.control.browserPrint({
            title: 'Just print me!',
            documentTitle: 'Map printed using leaflet.browser.print plugin',

            closePopupsOnPrint: false,
            printModes: ["Portrait", "Landscape", "Auto"],
            manualMode: false
        }).addTo(map);
        //var browserControl = L.control.browserPrint(options).addTo(map)
        //L.control.browserPrint(options).addTo(map);

        /*L.control.browserPrint({
            documentTitle:'Verify Me!',
            closePopupsOnPrint:false
        }).addTo(map) */


		window.map = map

	}

    function getPopContent (coord){
        return `<div>
            <div> name:  ${coord.name} </div>
            <div> lat:   ${coord.lat} </div>
            <div> lng:   ${coord.lng}</div>
        </div>`
    }

    function loadMarkers (assets, layerGroup, map) {
        if(!assets) return
        clearMap()
        assets.map(asset => {
            // get marker lat lng
            let coord = {name:asset[VAR_NAME] ,lat: asset.lat, lng: asset.lng}

            let marker = L.marker(coord , MARKER_OPTIONS)
                //.bindPopup(`### name: ${coord.name} lat: ${coord.lat} lng: ${coord.lng}`)
                .bindPopup(getPopContent(coord), POPUP_OPTIONS)
                .on('click', function(e) {
                    let cData = asset //coord
                    cData[REFRESH] = Date.now()
                    //map.setView(e.latlng, 13)
                    if(setOnMarkerClick) setOnMarkerClick(cData)
                })
                .addTo(layerGroup)

            marker.on('mouseover',function(ev) { // on hover
                marker.openPopup()
            })
        })
        map.addLayer(layerGroup)
        setLayerGroup(layerGroup)

    }

    function clearMap() {
        if(!layerGroup) return
        layerGroup.clearLayers()
        // if vector layer component available
        if(vectorLayerGroup) mapComponent.removeControl(vectorLayerGroup)
        //mapComponent.removeLayer(layerGroup)
        for(var i in mapComponent._layers) {

            if(mapComponent._layers[i]._path !== undefined) {
                try {
                    mapComponent.removeLayer(mapComponent._layers[i])
                }
                catch(e) {
                    console.log("problem with " + e + mapComponent._layers[i])
                }
            }
        }
    }

    function changeMap () {

        let vectorJson = [], failureChainJson = []
        clearMap()
        var mg = L.layerGroup()
        if(polyLine && Array.isArray(polyLine)) {
            // Draw markers
			polyLine.map(pl => {
				if(!pl.hasOwnProperty("data")) return
				pl.data.map(arr => {
					let linkArray = arr
					linkArray.map(la => {
						// get marker lat lng
						let coord = {name: la[VAR_NAME], lat: la.lat, lng: la.lng}
						let marker = L.marker(coord , MARKER_OPTIONS)
						    //.bindPopup(`### name: ${coord.name} lat: ${coord.lat} lng: ${coord.lng}`)
                            .bindPopup(getPopContent(coord), POPUP_OPTIONS)
						    .on('click', function(e) {
                                let cData = la //coord
                                cData[REFRESH] = Date.now()
                                //mapComponent.setView(e.latlng, 13) // zoom in on click
                                if(setOnMarkerClick) setOnMarkerClick(cData)
                            })
                        marker.on('mouseover',function(ev) { // on hover
                            marker.openPopup()
                        })
                        marker.addTo(mg)
					})
				})
			})

			// extracting only lat lng
			polyLine.map(pl => {
				let vectorCoords = []
				pl.data.map(arr => {
					let linkArray = arr
                    vectorJson.push({color: pl.color, title: pl.title, data: linkArray})
				})

			})
		}

        // gather failure chain markers
        if(displayFailureChains && Array.isArray(displayFailureChains )) {
            displayFailureChains.map(linkChains => {
                if(Array.isArray(linkChains)){
                    linkChains.map(link => {
                        let coord = { name:link[VAR_NAME], lat: link.lat, lng: link.lng }
                        let marker = L.marker(coord , MARKER_OPTIONS)
                            //.bindPopup(`### name:${coord.name} lat: ${coord.lat} lng: ${coord.lng}`)
                            .bindPopup(getPopContent(coord), POPUP_OPTIONS)
                            .on('click', function(e) {
                                let cData = link //coord
                                cData[REFRESH] = Date.now()
                                //map.setView(e.latlng, 13)
                                if(setOnMarkerClick) setOnMarkerClick(cData)
                            })
                        marker.on('mouseover',function(ev) { // on hover
                            marker.openPopup()
                        })
                        marker.addTo(mg)
                    })
                }
            })
        }

        // get vector and add arrows
		function getVector (vector, failureChainJson) {
			let layerJson = {}

            clearMap()

            let vectorControl = {
                [CRITICAL_LINKS]: [],
                [NON_CRITICAL_LINKS]: []
            }

            vector.map(vc => {
				if(vc.title === CRITICAL_LINKS) {
                    vectorControl[CRITICAL_LINKS].push(vc.data)
                }
                else if (vc.title === NON_CRITICAL_LINKS) {
                    vectorControl[NON_CRITICAL_LINKS].push(vc.data)
                }
			})

            //layer control for critical links
            if(vectorControl[CRITICAL_LINKS].length) {
                var things = L.polyline(vectorControl[CRITICAL_LINKS] , { color: CRITICAL_COLOR})
					.arrowheads(ARROW_OPTIONS)
					.bindPopup(
						`<code>var simpleVector0: L.polyline(coords).arrowheads()</code>`,
						{ maxWidth: 2000 }
					)

				//layerJson[CRITICAL_LINKS] = things.addTo(mapComponent)
                layerJson[CRITICAL_LINKS] = things.addTo(mg)
            }
            //layer control for non critical links
            if (vectorControl[NON_CRITICAL_LINKS].length) {
                var things = L.polyline(vectorControl[NON_CRITICAL_LINKS] , { color: NON_CRITICAL_COLOR})
					.arrowheads(ARROW_OPTIONS)
					.bindPopup(
						`<code>var simpleVector0: L.polyline(coords).arrowheads()</code>`,
						{ maxWidth: 2000 }
					)

				//layerJson[NON_CRITICAL_LINKS] = things.addTo(mapComponent)
                layerJson[NON_CRITICAL_LINKS] = things.addTo(mg)
            }

            console.log("displayFailureChains",displayFailureChains)

            // display Failure Chains
            if(displayFailureChains && Array.isArray(displayFailureChains )) {
                let gatherLinkedChains=[]
                displayFailureChains.map(linkChains => {
                    if(Array.isArray(linkChains)) gatherLinkedChains.push(linkChains)
                })

                //gatherLinkedChains.length === 1 means its the last node in chain - so we dont display
                // /commenting for now && gatherLinkedChains.length > 1
                if (Array.isArray(gatherLinkedChains) ) {
                    // add dashed lines to map to show indirect links
                    var  antPolyline = L.polyline.antPath(gatherLinkedChains, DASH_LINES_OPTIONS)
                    layerJson["Failure Nodes"] = antPolyline.addTo(mg)
                }

            }

			return layerJson
		}


        var layersControl = L.control
			.layers(null, getVector(vectorJson, failureChainJson),  {position: 'topleft', collapsed: false})
			.addTo(mapComponent)


        // add all gathered markers, polylines, failure chains to layer
        mapComponent.addLayer(mg)
        setLayerGroup(mg)

        //L.control.browserPrint().addTo(mapComponent)

        setVectorLayerGroup(layersControl)

    } //changeMap()

    const {
        woqlClient,
        setSuccessMsg,
        setErrorMsg,
        loading,
        setLoading,
	} = WOQLClientObj()

    const {
        setOnMarkerClick,
        polyLine,
        dependencies,
        onMarkerClick,
        setPolyLine,
        setFilterAssetById,
        filteredAssets,
        setFilterAssetByEvent,
        filterAssetByEvent,
        setFailureChain,
        displayFailureChains,
        setDisplayFailureChains,
        setVectorLayerGroup,
        vectorLayerGroup,
        layerGroup,
        setLayerGroup,
        emptyMessage,
        setEmptyMessage
    } = MapHook(woqlClient, setLoading, setSuccessMsg, setErrorMsg)

    console.log("displayFailureChains", displayFailureChains)
    console.log("polyLine", polyLine)
    console.log("showAssets", showAssets)

    let queryResults = QueryHook(woqlClient, query, setLoading, setSuccessMsg, setErrorMsg)

    useEffect(() => {
        if(!woqlClient) return
        let q = getAvailableAssets()
        setQuery(q)
    }, [woqlClient])

    useEffect(() => {
        if(queryResults.length) {
            //console.log("queryResults", queryResults)
            let locs = extractAssetLocations(queryResults)
            setShowAssets(locs)
            setLoading(false)
        }
    }, [queryResults])


    useEffect(() => {
        if(polyLine.length) {
            setRefresh(Date.now())
            changeMap()
        }
    }, [polyLine])

    useEffect(() => {
        if(Array.isArray(displayFailureChains) && displayFailureChains.length) {
            setRefresh(Date.now())
            changeMap()
        }
    }, [displayFailureChains])


    useEffect(() => {
        if(mapComponent) {
            //console.log("showAssets",showAssets)
            setOnMarkerClick(false)
            clearMap()
            var mg = L.layerGroup()
            loadMarkers (showAssets, mg, mapComponent)
        }
    }, [resetMap])





    useEffect(() => {
        if(filteredAssets.length) {
            setRefresh(Date.now())
            setPolyLine(false)
            clearMap()
            var mg = L.layerGroup()
            loadMarkers (filteredAssets, mg, mapComponent)
        }
    }, [filteredAssets])

    if(!showAssets && loading)
        return <ProgressBar animated now={100} variant="info"/>



    return <React.Fragment>
        <Layout/>

        <div className="content-container">
            <MapToolBar setResetMap={setResetMap}
                setDisplayFailureChains={setDisplayFailureChains}
                onMarkerClick={onMarkerClick}
                setFilterAssetByEvent={setFilterAssetByEvent}
                setFailureChain={setFailureChain}
                setFilterAssetById={setFilterAssetById}/>

            {
                emptyMessage &&
                <ToastContainer className="p-3 empty-result-toast" position={"middle-start"}>
                    <Toast  onClose={(e) => setEmptyMessage(false)}>
                        <Toast.Header>
                            <strong className="me-auto">{`Clicked on ${onMarkerClick.id}`}</strong>
                        </Toast.Header>
                        <Toast.Body>{emptyMessage}</Toast.Body>
                    </Toast>
                </ToastContainer>
            }

            {showAssets && <React.Fragment>

                {onMarkerClick.refresh && <DisplayMarkerInfo dependencies={dependencies} info={onMarkerClick}/>}

                <div className="map-container">
                    <div id={mapRef.current} className="leaflet-container"></div>
                </div>


                {loading && <ProgressBar animated now={100} variant="info"/>}

            </React.Fragment>}
        </div>

    </React.Fragment>
}



//gatherLinkedChains.length === 1 means its the last node in chain - so we dont display
                /*if (Array.isArray(gatherLinkedChains) && gatherLinkedChains.length > 1) {
                    var things = L.polyline(gatherLinkedChains, {
                        color: "maroon",
                        dashArray: '10, 10'
                    })
                    .arrowheads(ARROW_OPTIONS)
                    .bindPopup(
                        `<code>var simpleVector0: L.polyline(coords).arrowheads()</code>`,
                        { maxWidth: 2000 }
                    )
                    //layerJson["Failure Nodes"] = things.addTo(mapComponent)
                    layerJson["Failure Nodes"] = things.addTo(mg)

                    // add dashed lines to map to show indirect links
                    var  antPolyline = L.polyline.antPath(gatherLinkedChains, DASH_LINES_OPTIONS)
                    antPolyline.addTo(mg)
                    setAntPathLayer(antPolyline)
                } */

