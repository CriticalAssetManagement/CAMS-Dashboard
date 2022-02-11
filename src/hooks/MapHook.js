import {useEffect, useState} from 'react'
import {QueryHook} from "./QueryHook"
import {NON_CRITICAL_COLOR, CRITICAL_COLOR} from "../components/constants"
import {getAssetLocationQuery, getAssetDependentOnQuery} from "./queries"
import {DEPENDENT} from "../pages/constants"
import {extractLocations, handleDocumentSelect, extractAssetLocations} from "../components/utils"

export function MapHook(woqlClient, setLoading, setSuccessMsg, setErrorMsg) {

    const [documentID, setDocumentID] = useState(false)

    const [polyLine, setPolyLine] = useState([])
    const [dependencies, setDependencies] = useState(false)

    const [onMarkerClick, setOnMarkerClick] = useState(false)

    const [query, setQuery] = useState(false)

    // get document location on select of an Asset
    let queryResults = QueryHook(woqlClient, query, setSuccessMsg, setErrorMsg)

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


    return {
        setOnMarkerClick,
        polyLine,
        dependencies,
        onMarkerClick
    }
}

