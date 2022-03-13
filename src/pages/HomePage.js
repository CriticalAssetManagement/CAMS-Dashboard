import React, {useState, useRef, useEffect, useContext} from "react"
import {Layout} from "../components/Layout"
import {ProgressBar, Button, Row} from "react-bootstrap"
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
//import 'leaflet/dist/leaflet.css';
import {antPath} from 'leaflet-ant-path'
import {CRITICAL_LINKS, NON_CRITICAL_LINKS, NON_CRITICAL_COLOR, CRITICAL_COLOR} from "../components/constants"
import {LATITUDE, LONGITUDE, DASH_LINES_OPTIONS, MAP_ID, ARROW_OPTIONS, MARKER_OPTIONS, MAP_OPTIONS, POINTS, POLYGON, LAT, LNG, REFRESH}  from "../components/Maps/constants"

export const HomePage = () => {
    const [query, setQuery] = useState(false)
    const [showAssets, setShowAssets] = useState(false)
    const [resetMap, setResetMap] = useState(false)
    const [refresh, setRefresh]=useState(false)

    console.log("showAssets",showAssets)

    //map constants
    const [mapComponent, setMapComponent] = useState(false)
    const [layerGroup, setLayerGroup] = useState(false)


    const mapRef = useRef(MAP_ID)

    useEffect(() => {
        if(!showAssets) return
		map()
	}, [showAssets])

    const map = () => {
		const map = L.map(mapRef.current , MAP_OPTIONS)
        //map.invalidateSize()

        setMapComponent(map)

		const tileLayer = new L.TileLayer(
			"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
			{
				attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}
		)
		tileLayer.addTo(map)
        // layer group
        var mg = L.layerGroup()
        loadMarkers (showAssets, mg, map)
        map.addLayer(mg)
        setLayerGroup(mg)

		window.map = map

	}

    function loadMarkers (assets, layerGroup, map) {
        if(!assets) return
        clearMap()
        assets.map(asset => {
            // get marker lat lng
            let coord = {lat: asset.lat, lng: asset.lng}

            L.marker(coord , MARKER_OPTIONS)
                .bindPopup(`### name: ${coord.name} lat: ${coord.lat} lng: ${coord.lng}`)
                .on('click', function(e) {
                    let cData = asset //coord
                    cData[REFRESH] = Date.now()
                    map.setView(e.latlng, 13)
                    if(setOnMarkerClick) setOnMarkerClick(cData)
                })
                .addTo(layerGroup)
        })
    }

    function clearMap() {
        if(!layerGroup) return
        layerGroup.clearLayers()
        mapComponent.removeLayer(layerGroup)
        //mapComponent.removeLayer(EPSLayer); dont use strings in the function
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
						    .bindPopup(`### name: ${coord.name} lat: ${coord.lat} lng: ${coord.lng}`)
						    .on('click', function(e) {
                                let cData = la //coord
                                cData[REFRESH] = Date.now()
                                mapComponent.setView(e.latlng, 13) // zoom in on click
                                if(setOnMarkerClick) setOnMarkerClick(cData)
                            })
						marker.addTo(mapComponent)
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
                            .bindPopup(`### name:${coord.name} lat: ${coord.lat} lng: ${coord.lng}`)
			            marker.addTo(mapComponent)
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

				layerJson[CRITICAL_LINKS] = things.addTo(mapComponent)
            }
            //layer control for non critical links
            if (vectorControl[NON_CRITICAL_LINKS].length) {
                var things = L.polyline(vectorControl[NON_CRITICAL_LINKS] , { color: NON_CRITICAL_COLOR})
					.arrowheads(ARROW_OPTIONS)
					.bindPopup(
						`<code>var simpleVector0: L.polyline(coords).arrowheads()</code>`,
						{ maxWidth: 2000 }
					)

				layerJson[NON_CRITICAL_LINKS] = things.addTo(mapComponent)
            }

            // display Failure Chains
            if(displayFailureChains && Array.isArray(displayFailureChains )) {
                displayFailureChains.map(linkChains => {
                    if(Array.isArray(linkChains)){
                            var things = L.polyline(linkChains, {
                                color: "maroon",
                                dashArray: '10, 10'
                            })
                            .arrowheads(ARROW_OPTIONS)
                            .bindPopup(
                                `<code>var simpleVector0: L.polyline(coords).arrowheads()</code>`,
                                { maxWidth: 2000 }
                            )
                        layerJson["Failure Nodes"] = things.addTo(mapComponent)

                        // add dashed lines to map to show indirect links
                        var  antPolyline = L.polyline.antPath(linkChains, DASH_LINES_OPTIONS)
                        antPolyline.addTo(mapComponent)
                    }
                })
            }


			return layerJson
		}

		var layerscontrol = L.control
			.layers(null, getVector(vectorJson, failureChainJson),  {position: 'bottomleft', collapsed: false})
			.addTo(mapComponent)

        setVectorLayerGroup(layerscontrol)

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
        setFailureChain,
        displayFailureChains,
        setVectorLayerGroup,
        vectorLayerGroup
    } = MapHook(woqlClient, setLoading, setSuccessMsg, setErrorMsg)

    console.log("displayFailureChains", displayFailureChains)

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
            var mg = L.layerGroup()
            mapComponent.addLayer(mg)
            loadMarkers (showAssets, mg, mapComponent)
        }
    }, [resetMap])





    useEffect(() => {
        if(filteredAssets.length) {
            setRefresh(Date.now())
            setPolyLine(false)
            loadMarkers (filteredAssets, mapComponent)
        }
    }, [filteredAssets])

    if(!showAssets && loading)
        return <ProgressBar animated now={100} variant="info"/>



    return <React.Fragment>
        <Layout/>

        <MapToolBar setResetMap={setResetMap}
            setFilterAssetByEvent={setFilterAssetByEvent}
            setFailureChain={setFailureChain}
            setFilterAssetById={setFilterAssetById}/>

        {showAssets && <React.Fragment>

            {onMarkerClick.refresh && <DisplayMarkerInfo dependencies={dependencies} info={onMarkerClick}/>}

            <div id={mapRef.current} style={{ height: "100vh" }}></div>

            {loading && <ProgressBar animated now={100} variant="info"/>}

        </React.Fragment>}
    </React.Fragment>
}





