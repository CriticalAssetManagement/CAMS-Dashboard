import React, {useState, useRef, useEffect, useContext} from "react"
import {Layout} from "../components/Layout"
import {ProgressBar, Button, Alert} from "react-bootstrap"
import {VAR_NAME} from "../components/constants"
import {WOQLClientObj} from '../init-woql-client'
import {QueryHook} from "../hooks/QueryHook"
import {getAvailableAssets} from "../hooks/queries"
import {extractAssetLocations} from "../components/utils"
import {MapHook} from "../hooks/MapHook"
import {MapToolBar} from "../components/MapToolBar"
import {SearchBar} from "../components/SearchBar"
import {DisplayMarkerInfo} from "../components/DisplayMarkerInfo"
import "leaflet-arrowheads"
import {LATITUDE, LONGITUDE, DASH_LINES_OPTIONS, MAP_ID, ARROW_OPTIONS, MARKER_OPTIONS, MAP_OPTIONS, BROWSER_PRINT_OPTIONS, POINTS, POLYGON, LAT, LNG, REFRESH, POPUP_OPTIONS}  from "../components/maps/constants"
import {extractAndDrawVectors, gatherVectorLines, drawFailureChains, getMarkers, drawUpwardChainMarkers} from "../components/maps/utils"
import "leaflet.browser.print/dist/leaflet.browser.print.min.js"
import "leaflet/dist/leaflet.css"
import {getLegend} from "../components/maps/legend"
import { useAuth0 } from "@auth0/auth0-react"
import {Login} from "./Login"
import {VAR_CENTER, VAR_ZOOM, INFO_VARIANT} from "../components/constants"
import { FaLanguage } from "react-icons/fa"

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
        if(!mapConfig) return 
		map()
	}, [showAssets, mapConfig]) 

    console.log("mapConfig", mapConfig)

    const map = () => {
        let mapOptions = MAP_OPTIONS 

        mapOptions[VAR_CENTER]=mapConfig[VAR_CENTER]
        mapOptions[VAR_ZOOM]=mapConfig[VAR_ZOOM] 
        
        //console.log("mapOptions", mapOptions)
		const map = L.map(mapRef.current , mapOptions)
        map.invalidateSize()

        setMapComponent(map)
        const tileLayer = new  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })

		tileLayer.addTo(map)

        // layer group
        var mg = L.layerGroup()
        //console.log("showAssets", showAssets)
        loadMarkers (showAssets, mg, map)

        // add print control
        //L.control.browserPrint(BROWSER_PRINT_OPTIONS)
        //.addTo(map)

        // get icon legends and add to map
        let legend=getLegend(L, language)
        legend.addTo(map) 

		window.map = map

	}

    // function to load markers on to map
    function loadMarkers (assets, layerGroup, map) {
        if(!assets) return
        clearMap()
        getMarkers (assets, layerGroup, setOnMarkerClick, language)
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
        let vectorJson=extractAndDrawVectors(polyLine, setOnMarkerClick, mg, language)
        // draw failure chain
        drawFailureChains (displayFailureChains, setOnMarkerClick, mg, language)

        // draw upward chain
        drawUpwardChainMarkers (displayUpwardChains, setOnMarkerClick, mg, language)

        // get vector and add arrows
		function getVector (vector) {
            clearMap()
            return gatherVectorLines(vector, displayFailureChains, displayUpwardChains, mg, onMarkerClick, language)
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
        frames,
        language,
        mapConfig
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
        setDisplayUpwardChains,
        setVectorLayerGroup,
        vectorLayerGroup,
        layerGroup,
        setLayerGroup,
        setUpwardChain,
        displayUpwardChains 
    } = MapHook(woqlClient, setLoading, setSuccessMsg, setErrorMsg)

    const {
        isAuthenticated
    } = useAuth0()

    //console.log("displayFailureChains", displayFailureChains)
    //console.log("polyLine", polyLine)
    //console.log("showAssets", showAssets)

    let queryResults = QueryHook(woqlClient, query, setLoading, setSuccessMsg, setErrorMsg)

    useEffect(() => {
        if(!woqlClient) return
        let q = getAvailableAssets()
        setQuery(q)
    }, [woqlClient])

    useEffect(() => {
        if(queryResults.length) {
            //console.log("queryResults", queryResults)
            let locs = extractAssetLocations(queryResults, frames)
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

    // failure chains
    useEffect(() => {
        if(Array.isArray(displayFailureChains) && displayFailureChains.length > 0) {
            setRefresh(Date.now())
            changeMap()
        }
    }, [displayFailureChains])

    // upward chains
    useEffect(() => {
        if(Array.isArray(displayUpwardChains) && displayUpwardChains.length > 0) {
            setRefresh(Date.now())
            changeMap()
        }
    }, [displayUpwardChains]) 

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

    useEffect(() => {
        //console.log("I am refreshed", onMarkerClick)
        if(setDisplayFailureChains) {
            // clear failure chains
            setDisplayFailureChains([])
            setFailureChain(false)
        }
        // clear upward chain
        if(setDisplayUpwardChains) {
            setDisplayUpwardChains([])
            setUpwardChain(false)
        }
        // clear filter by ID, Events
        if(setFilterAssetById) setFilterAssetById(false)
        if(setFilterAssetByEvent) setFilterAssetByEvent(false)
        // clear grades
        /*setGradedEvents(false)
        // clear grade scales
        setMaxScale(false)
        setCurrentGrade(false) */
    }, [onMarkerClick.refresh])

    if(!showAssets && loading)
        return <ProgressBar animated now={100} variant="info"/>

    if(!mapConfig && loading )
        return <ProgressBar animated now={100} variant="info"/>


    return <React.Fragment>
        <Layout/>
        {!isAuthenticated &&  <Login/>}
        {isAuthenticated && <div className="content-container">
            <MapToolBar setResetMap={setResetMap}
                resetMap={resetMap}
                setDisplayFailureChains={setDisplayFailureChains}
                setDisplayUpwardChains={setDisplayUpwardChains}
                onMarkerClick={onMarkerClick}
                setFilterAssetByEvent={setFilterAssetByEvent}
                setFailureChain={setFailureChain}
                setUpwardChain={setUpwardChain}
                setFilterAssetById={setFilterAssetById}/>

            {!showAssets && <Alert key={"no-assets-info"} variant={INFO_VARIANT}>
                {language.NO_ASSETS_AVAILABLE_MAP}
            </Alert>}

            {showAssets && <React.Fragment>

                {onMarkerClick.refresh && <DisplayMarkerInfo dependencies={dependencies} info={onMarkerClick}/>}

                <div className="map-container">
                    <div id={mapRef.current} className="leaflet-container"></div>
                </div>


                {loading && <ProgressBar animated now={100} variant={INFO_VARIANT}/>}

            </React.Fragment>}
        </div>}

    </React.Fragment>
}



