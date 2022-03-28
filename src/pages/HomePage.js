import React, {useState, useRef, useEffect, useContext} from "react"
import {Layout} from "../components/Layout"
import {ProgressBar, Button, Row, Toast, ToastContainer} from "react-bootstrap"
import {VAR_NAME} from "../components/constants"
import {WOQLClientObj} from '../init-woql-client'
import {QueryHook} from "../hooks/QueryHook"
import {getAvailableAssets} from "../hooks/queries"
import {extractAssetLocations} from "../components/utils"
import {MapHook} from "../hooks/MapHook"
import {DEPENDENCY_RELATION_TYPE_TITLE, HOME_PAGE_TABLE_CSS, NO_DEPENDENCY_ALERT, SEARCH_ASSET} from "./constants"
import {MapToolBar} from "../components/MapToolBar"
import {SearchBar} from "../components/SearchBar"
import {DisplayMarkerInfo} from "../components/DisplayMarkerInfo"
import "leaflet-arrowheads"
import {antPath} from 'leaflet-ant-path'
import {LATITUDE, LONGITUDE, DASH_LINES_OPTIONS, MAP_ID, ARROW_OPTIONS, MARKER_OPTIONS, MAP_OPTIONS, BROWSER_PRINT_OPTIONS, POINTS, POLYGON, LAT, LNG, REFRESH, POPUP_OPTIONS}  from "../components/maps/constants"
import {extractAndDrawVectors, gatherVectorLines, drawFailureChains, getMarkers, drawPolyLine} from "../components/maps/utils"
import "leaflet.browser.print/dist/leaflet.browser.print.min.js"
import "leaflet/dist/leaflet.css"
import {getLegend} from "../components/maps/legend"

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

        // add print control
        L.control.browserPrint(BROWSER_PRINT_OPTIONS)
        .addTo(map)

        // get legends and add to map
        //let legend=getLegend(L)
        //legend.addTo(map)

		window.map = map

	}

    // function to load markers on to map
    function loadMarkers (assets, layerGroup, map) {
        if(!assets) return
        clearMap()
        getMarkers (assets, layerGroup, setOnMarkerClick, filterAssetByEvent)
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
        clearMap()
        var mg = L.layerGroup()
        let vectorJson=extractAndDrawVectors(polyLine, setOnMarkerClick, mg)
        // draw failure chain
        drawFailureChains (displayFailureChains, mg)

        // get vector and add arrows
		function getVector (vector) {
            clearMap()
            return gatherVectorLines(vector, displayFailureChains, mg, onMarkerClick)
		}

        var layersControl = L.control
			.layers(null, getVector(vectorJson, displayFailureChains),  {position: 'topleft', collapsed: false})
			.addTo(mapComponent)

        // add all gathered markers, polylines, failure chains to layer
        mapComponent.addLayer(mg)
        setLayerGroup(mg)
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
                resetMap={resetMap}
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



