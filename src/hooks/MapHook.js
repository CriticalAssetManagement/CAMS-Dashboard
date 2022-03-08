import {useEffect, useState} from 'react'
import {QueryHook} from "./QueryHook"
import {NON_CRITICAL_COLOR, CRITICAL_COLOR, CRITICAL_LINKS, NON_CRITICAL_LINKS} from "../components/constants"
import {filterAssetsByIDQuery, getAssetFailureChain, getAssetsByEventsQuery, getAssetDependentOnQuery} from "./queries"
import {DEPENDENT} from "../pages/constants"
import {extractLocations, handleDocumentSelect, extractAssetLocations} from "../components/utils"

export function MapHook(woqlClient, setLoading, setSuccessMsg, setErrorMsg) {

    const [documentID, setDocumentID] = useState(false)

    // link constants
    const [polyLine, setPolyLine] = useState([])
    const [dependencies, setDependencies] = useState(false)
    const [query, setQuery] = useState(false)

    const [onMarkerClick, setOnMarkerClick] = useState(false)

    //filter constants
    const [filterAssetById, setFilterAssetById]=useState(false)
    const [filterByAssetQuery, setFilterByAssetQuery]=useState(false)
    const [filteredAssets, setFilteredAssets]=useState(false)

    // filter by event constants
    const [filterAssetByEvent, setFilterAssetByEvent]=useState(false)
    const [filterAssetByEventQuery, setFilterAssetByEventQuery]=useState(false)

    //failure chain constants
    const [failureChain, setFailureChain] = useState(false)
    const [failureChainPathQuery, setFailureChainPathQuery] = useState(false)
    const [displayFailureChains, setDisplayFailureChains] = useState(false)
    let failureChainResults = QueryHook(woqlClient, failureChainPathQuery, setLoading, setSuccessMsg, setErrorMsg)

    // get document location on select of an Asset
    let queryResults = QueryHook(woqlClient, query, setLoading, setSuccessMsg, setErrorMsg)

    // get document location on filtering of an Asset
    //let filteredByAssetResults = QueryHook(woqlClient, filterByAssetQuery, setLoading, setSuccessMsg, setErrorMsg)


    let filteredByAssetResults = QueryHook(woqlClient, filterAssetByEventQuery, setLoading, setSuccessMsg, setErrorMsg)

    console.log("onMarkerClick", onMarkerClick)
    //console.log("**** failureChainResults", queryResults, failureChainResults)

    // on select of Asset
    useEffect(() => { // get dependent on assets
        if(!documentID) return
        let q = getAssetDependentOnQuery(documentID)
        setQuery(q)
    }, [documentID])

    // on click of Asset
    useEffect(() => {
        if(!onMarkerClick) return
        //console.log("onMarkerClick", onMarkerClick)
        if(onMarkerClick.hasOwnProperty("id")) {
            setPolyLine(false)
            setDependencies(false)
            setLoading(true)
            setDocumentID(onMarkerClick.id)
        }
    }, [onMarkerClick])

    useEffect(() => { //working
        if(!Object.keys(queryResults).length) {
            setLoading(false)
            setPolyLine(false)
            return
        }
        let locs = extractAssetLocations(queryResults)
        setDependencies(locs)

        let gatherPolylines = [], json = {}

        locs.map(lcs => {
            // link is array of dependant and dependant on info
            let link = []
            link.push(onMarkerClick)
            link.push(lcs)
            if(!gatherPolylines.length) {  //empty
                gatherPolylines.push({
                    color: lcs.critical === "true" ? CRITICAL_COLOR : NON_CRITICAL_COLOR,
                    title: lcs.critical === "true" ? CRITICAL_LINKS : NON_CRITICAL_LINKS,
                    data: [link]
                })
            }
            else {
                let colorExists = false
                gatherPolylines.map(polys => {
                    var color = NON_CRITICAL_COLOR
                    if(lcs.critical === "true") color = CRITICAL_COLOR
                    if(polys.color === color) { // color links exists to populate data array
                        colorExists=true
                        polys.data.push(link) // add on entries of links to same color
                        return
                    }
                })
                if(!colorExists) { // add a new entry color link to gatherPolylines
                    gatherPolylines.push({
                        color: lcs.critical === "true" ? CRITICAL_COLOR : NON_CRITICAL_COLOR,
                        title: lcs.critical === "true" ? CRITICAL_LINKS : NON_CRITICAL_LINKS,
                        data: [link]
                    })
                }
            }
        })
        //console.log("gatherPolylines", gatherPolylines)
        setPolyLine(gatherPolylines)
        setLoading(false)
    }, [queryResults])




    // on flitering by Asset ID
    useEffect(() => {
        if(!filterAssetById) return
        setPolyLine(false)
        let q = filterAssetsByIDQuery(filterAssetById)
        setFilterByAssetQuery(q)
    }, [filterAssetById])

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

    //filter by events
    useEffect(() => {
        //console.log("filterAssetByEvent", filterAssetByEvent)
        // list of hazard event checkboxes
        if(Array.isArray(filterAssetByEvent) && filterAssetByEvent.length) {
            let q = getAssetsByEventsQuery(filterAssetByEvent)
            setFilterAssetByEventQuery(q)
        }
    }, [filterAssetByEvent])

    // if failure chain is checked
    useEffect(() => {
        if(failureChain && Object.keys(onMarkerClick).length && onMarkerClick.hasOwnProperty("id")) {
            let q = getAssetFailureChain(onMarkerClick["id"])
            setFailureChainPathQuery(q)
        }
    }, [failureChain])

    /*useEffect(() => {
        if(Array.isArray(queryResults) && Array.isArray(failureChainResults)) {
            let locs = extractAssetLocations(queryResults) //clean up and extract lat and long
            let directLinkedAssets = [], newFailureChainResults = []
            locs.map(lcs => {
                directLinkedAssets.push(lcs.id)
            })
            let failureChainResultsLocs = extractAssetLocations(failureChainResults) //clean up and extract lat and long

            // remove direct links from failure chain results
            failureChainResultsLocs.map(fcs => {
                if(fcs.hasOwnProperty("id")) {
                    let match = false
                    directLinkedAssets.map(dla => {
                        if(dla === fcs["id"]) { // direct links found - we remove it so as to display dashed links for failure chains
                            match = dla
                            return match
                        }
                    })
                    if(!match) newFailureChainResults.push(fcs)
                }
            })
            if(Array.isArray(newFailureChainResults) && newFailureChainResults.length)
                setDisplayFailureChains(newFailureChainResults)
        }
    }, [failureChainResults])*/

    useEffect(() => {
        if(Array.isArray(failureChainResults) && onMarkerClick.hasOwnProperty("id")) {
            console.log("failureChainResults", failureChainResults)
        }
    }, [failureChainResults])


    return {
        setOnMarkerClick,
        polyLine,
        dependencies,
        onMarkerClick,
        setPolyLine,
        filterAssetById,
        setFilterAssetById,
        filteredAssets,
        setFilteredAssets,
        setFilterAssetByEvent,
        setFailureChain,
        displayFailureChains
    }
}




/*let doc = "Asset/Portsmouth%20Hospital"

and (
  path(doc, "(<depends_on,dependent>)*", "v:Asset").
  triple("v:Relation", "@schema:depends_on", "v:Asset").
  triple("v:Relation", "@schema:dependent", "v:NewAsset")
 )*/




let testCoords = [
	[15.583331, -61.4666648], //portsmouth
	[15.30083213, -61.386331788], //roseau
	[15.53743, -61.282] // marigot
]




let failureChainCoords = [
	[15.53743, -61.282], //marigot
	[15.32768, -61.24753], // La Plaine
	[15.36667, -61.35] //Pont Cassé
]


    // on results of clicked Asset
    /*useEffect(() => { //working
        if(!Object.keys(queryResults).length) {
            setLoading(false)
            setPolyLine(false)
            return
        }
        let locs = extractAssetLocations(queryResults)
        setDependencies(locs)
        let gatherPolylines = [], json = {}
        locs.map(lcs => {
            let link = []
            link.push(onMarkerClick)
            link.push(lcs)
            gatherPolylines.push({
                color: lcs.critical === "true" ? CRITICAL_COLOR : NON_CRITICAL_COLOR,
                data: link
            })
        })
        //console.log("gatherPolylines", gatherPolylines)
        setPolyLine(gatherPolylines)
        setLoading(false)
    }, [queryResults])*/