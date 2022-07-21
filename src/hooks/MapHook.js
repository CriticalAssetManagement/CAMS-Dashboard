import {useEffect, useState} from 'react'
import {QueryHook, executeQuery} from "./QueryHook"
import {NON_CRITICAL_COLOR, CRITICAL_COLOR, CRITICAL_LINKS, VAR_CRITICAL, VAR_LATITUDE, VAR_LONGITUDE, NON_CRITICAL_LINKS, VAR_ASSET, VAR_LINKED_ASSET} from "../components/constants"
import {getAssetFailureChain, getAssetsByEventsOrIDQuery, getAssetDependentOnQuery, getAssetUpwardChain} from "./queries"
import {DEPENDENT} from "../pages/constants"
import {REFRESH} from "../components/maps/constants"
import {extractLocations, handleDocumentSelect, extractAssetLocations, getUpwardChainAssetLocation, extractNewAssetLocations, getFailureChainAssetLocation} from "../components/utils"
import { arrayOf } from 'prop-types'

export function MapHook(woqlClient, setLoading, setSuccessMsg, setErrorMsg) {

    // link constants
    const [polyLine, setPolyLine] = useState([])
    const [dependencies, setDependencies] = useState(false)
    const [query, setQuery] = useState(false)

    const [onMarkerClick, setOnMarkerClick] = useState(false)

    //filter constants
    const [filterAssetById, setFilterAssetById]=useState(false)
    const [filteredAssets, setFilteredAssets]=useState(false)

    // filter by event constants
    const [filterAssetByEvent, setFilterAssetByEvent]=useState(false)
    const [filterAssetByEventOrIDQuery, setFilterAssetByEventOrIDQuery]=useState(false)

    //failure chain constants
    const [failureChain, setFailureChain] = useState(false)
    const [failureChainPathQuery, setFailureChainPathQuery] = useState(false)
    const [displayFailureChains, setDisplayFailureChains] = useState([])
    let failureChainResults = QueryHook(woqlClient, failureChainPathQuery, setLoading, setSuccessMsg, setErrorMsg)

    // upward chain constants
    const [upwardChain, setUpwardChain]= useState(false)
    const [upwardChainQuery, setUpwardChainQuery]= useState(false)
    const [displayUpwardChains, setDisplayUpwardChains] = useState([])
    let upwardChainResults = QueryHook(woqlClient, upwardChainQuery, setLoading, setSuccessMsg, setErrorMsg)

    // get document location on select of an Asset
    let queryResults = QueryHook(woqlClient, query, setLoading, setSuccessMsg, setErrorMsg)

    let filteredByAssetResults = QueryHook(woqlClient, filterAssetByEventOrIDQuery, setLoading, setSuccessMsg, setErrorMsg)

    // map layers and vector constants
    const [vectorLayerGroup, setVectorLayerGroup] = useState(false)
    const [layerGroup, setLayerGroup] = useState(false)

    //console.log("filteredByAssetResults", filteredByAssetResults)


    // on click of Asset
    useEffect(() => {
        if(!onMarkerClick) return
        //console.log("onMarkerClick", onMarkerClick)
        if(onMarkerClick.hasOwnProperty(VAR_ASSET)) {
            setPolyLine(false)
            setDependencies(false)
            setLoading(true)
            let documentID = onMarkerClick[VAR_ASSET]
            let q = getAssetDependentOnQuery(documentID)
            setQuery(q)
        }
        /*if(onMarkerClick.hasOwnProperty("id")) {
            setPolyLine(false)
            setDependencies(false)
            setLoading(true)
            let documentID = onMarkerClick["id"]
            let q = getAssetDependentOnQuery(documentID)
            setQuery(q)
        }*/
    }, [onMarkerClick[REFRESH]])

    useEffect(() => {
        //if(onMarkerClick && onMarkerClick.hasOwnProperty("id") && Array.isArray(queryResults) && queryResults.length > 0) {
        if(onMarkerClick && onMarkerClick.hasOwnProperty(VAR_ASSET) && Array.isArray(queryResults) && queryResults.length > 0) {
            let locs = extractAssetLocations(queryResults) 
            setDependencies(locs)

            let gatherPolylines = []

            //console.log("locs", locs)
            locs.map(lcs => {
                // link is array of dependant and dependant on info
                let link = []
                link.push(onMarkerClick)
                link.push(lcs)
                if(!gatherPolylines.length) {  //empty
                    gatherPolylines.push({
                        color: lcs[VAR_CRITICAL] === "true" ? CRITICAL_COLOR : NON_CRITICAL_COLOR,
                        title: lcs[VAR_CRITICAL] === "true" ? CRITICAL_LINKS : NON_CRITICAL_LINKS,
                        data: [link]
                    })
                }
                else {
                    let colorExists = false
                    gatherPolylines.map(polys => {
                        var color = NON_CRITICAL_COLOR
                        if(lcs[VAR_CRITICAL] === "true") color = CRITICAL_COLOR
                        if(polys.color === color) { // color links exists to populate data array
                            colorExists=true
                            polys.data.push(link) // add on entries of links to same color
                            return
                        }
                    })
                    if(!colorExists) { // add a new entry color link to gatherPolylines
                        gatherPolylines.push({
                            color: lcs[VAR_CRITICAL] === "true" ? CRITICAL_COLOR : NON_CRITICAL_COLOR,
                            title: lcs[VAR_CRITICAL] === "true" ? CRITICAL_LINKS : NON_CRITICAL_LINKS,
                            data: [link]
                        })
                    }
                }
            })
            //console.log("gatherPolylines", gatherPolylines)
            setPolyLine(gatherPolylines)
            setLoading(false)
        }
    }, [queryResults])

    // on results of filtering by asset
    useEffect(() => {
        if(!Object.keys(filteredByAssetResults).length) {
            setLoading(false)
            return
        }
        let locs = extractAssetLocations(filteredByAssetResults)
        setFilteredAssets(locs)
        setLoading(false)
    }, [filteredByAssetResults])

    //filter by events/ Asset ID
    useEffect(() => {
        //if(!filterAssetByEvent) return
        //if(!filterAssetById) return
        setPolyLine(false) 
        let q = getAssetsByEventsOrIDQuery(filterAssetByEvent, filterAssetById)
        setFilterAssetByEventOrIDQuery(q)
    }, [filterAssetByEvent, filterAssetById])

    // if failure chain is checked
    useEffect(() => {
        if(failureChain && Object.keys(onMarkerClick).length && onMarkerClick.hasOwnProperty(VAR_ASSET)) {
            let q = getAssetFailureChain(onMarkerClick[VAR_ASSET])
            setFailureChainPathQuery(q)
        }
        else if(!failureChain) setDisplayFailureChains([])
    }, [failureChain])


    useEffect(() => {
        // get failure node
        if(Array.isArray(failureChainResults) && failureChainResults.length && onMarkerClick.hasOwnProperty(VAR_ASSET)) {
            //console.log("failureChainResults ****", failureChainResults)
            //console.log("polyline", polyLine)
            let locationResults = getFailureChainAssetLocation(failureChainResults) 
            setDisplayFailureChains(locationResults)

        }
    }, [failureChainResults])

    // if upward chain is checked
    useEffect(() => {
        if(upwardChain && Object.keys(onMarkerClick).length && onMarkerClick.hasOwnProperty(VAR_ASSET)) {
            let q = getAssetUpwardChain(onMarkerClick[VAR_ASSET])
            setUpwardChainQuery(q)
        }
        else if(!failureChain) setDisplayFailureChains([])
    }, [upwardChain])

    useEffect(() => {
        // get failure node
        if(Array.isArray(upwardChainResults) && upwardChainResults.length && onMarkerClick.hasOwnProperty(VAR_ASSET)) {
            //console.log("polyline", polyLine)
            let locationResults = getUpwardChainAssetLocation(upwardChainResults)
            //console.log("locationResults", locationResults)
            setDisplayUpwardChains(locationResults)

        }
    }, [upwardChainResults])

    return {
        setOnMarkerClick,
        polyLine,
        dependencies,
        onMarkerClick,
        setOnMarkerClick,
        setPolyLine,
        filterAssetById,
        setFilterAssetById,
        setFilterAssetByEvent,
        setFailureChain,
        setUpwardChain,
        filteredAssets,
        displayFailureChains,
        setVectorLayerGroup,
        vectorLayerGroup,
        layerGroup,
        setLayerGroup,
        setDisplayFailureChains,
        setDisplayUpwardChains,
        displayUpwardChains
    }
}


/**
 * let first = [
                {Asset: 'Asset/Saint%20Joseph', lng: -61.43333, name: 'Saint Joseph', lat: 15.4},
                {Asset: 'Asset/Marigot', lat: 15.53743, name: 'Marigot', lng: -61.282},
                {Asset: 'Asset/Wesley', lng: -61.31667, name: 'Wesley', lat: 15.56667}
            ]

            let second = [
                {Asset: 'Asset/Salisbury', lat: 15.43689, name: 'Salisbury', lng: -61.43637},
                {Asset: 'Asset/Mahaut', lat: 15.36357, name: 'Mahaut', lng: -61.39701}
            ]

           // setDisplayFailureChains([first, second])
 */

/*let doc = "Asset/Portsmouth%20Hospital"

and (
  path(doc, "(<depends_on,dependent>)*", "v:Asset").
  triple("v:Relation", "@schema:depends_on", "v:Asset").
  triple("v:Relation", "@schema:dependent", "v:NewAsset")
 )*/

