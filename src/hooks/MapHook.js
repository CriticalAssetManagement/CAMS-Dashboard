import {useEffect, useState} from 'react'
import {QueryHook} from "./QueryHook"
import {NON_CRITICAL_COLOR, CRITICAL_COLOR} from "../components/constants"
import {filterStatusDependencyQuery, filterAssetsByIDQuery, getAssetDependentOnQuery} from "./queries"
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
    const [criticalLinks, setCriticalLinks]=useState(false)
    const [filterAssetById, setFilterAssetById]=useState(false)
    const [filterByAssetQuery, setFilterByAssetQuery]=useState(false)
    const [filteredAssets, setFilteredAssets]=useState(false)

    // get document location on select of an Asset
    let queryResults = QueryHook(woqlClient, query, setLoading, setSuccessMsg, setErrorMsg)

    // get document location on filtering of an Asset
    let filteredByAssetResults = QueryHook(woqlClient, filterByAssetQuery, setLoading, setSuccessMsg, setErrorMsg)

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

    // on results of clicked Asset
    useEffect(() => {
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
    }, [queryResults])

    // on click of critical link checkboxes
    useEffect(() => {
        if(!documentID) return
        if(criticalLinks === undefined) return
        let q = filterStatusDependencyQuery(documentID, criticalLinks)
        setQuery(q)
    }, [criticalLinks])

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

    return {
        setOnMarkerClick,
        polyLine,
        dependencies,
        onMarkerClick,
        criticalLinks,
        setCriticalLinks,
        setPolyLine,
        filterAssetById,
        setFilterAssetById,
        filteredAssets,
        setFilteredAssets
    }
}

