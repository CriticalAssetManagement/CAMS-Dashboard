import React, {useState, useEffect} from "react"
import {Form} from "./Form"
import {CREATE_MODE, DEPENDENCY_RELATION_TYPE, DEPENDENT, LOCATION} from "../pages/constants"
import {handleDocumentSelect} from "./utils"
import {WOQLClientObj} from '../init-woql-client'
import {CustomCuisineFieldTemplate, extractLocations} from "./utils"
import {ViewDocumentHook} from "../hooks/ViewDocumentHook"
import {Map} from "./Map"
import {QueryHook} from "../hooks/QueryHook"
import {getAssetLocationQuery} from "./queries"

export const List = ({type}) => {

    const {
        frames,
        woqlClient,
        setSuccessMsg,
        setErrorMsg
	} = WOQLClientObj()

    const [documentID, setDocumentID] = useState(false)
    const [showLocations, setShowLocations] = useState(false)

    const [query, setQuery] = useState(false)

    let queryResults = QueryHook(woqlClient, query, setSuccessMsg, setErrorMsg)

    useEffect(() => {
        if(!documentID) return
        let q = getAssetLocationQuery(documentID)
        setQuery(q)

    }, [documentID])

    useEffect(() => {
        if(!Object.keys(queryResults).length) return
        setShowLocations(extractLocations(queryResults))

    }, [queryResults])



    function handleSelect(inp, type) {
        if(!inp) return
        return handleDocumentSelect(woqlClient, inp, type)
    }

    function handleChange(changed) {
        if(!Object.keys(changed).length) return
        setDocumentID(changed[DEPENDENT])
    }

    return <React.Fragment>
        {frames && <Form frames={frames}
            type={DEPENDENCY_RELATION_TYPE}
            mode={CREATE_MODE}
            onSelect={handleSelect}
            onChange={handleChange}
            hideSubmit={true}
            FieldTemplate={CustomCuisineFieldTemplate}
        />}
        {showLocations && <Map documents = {showLocations}
            display = {"Point"}/>}
    </React.Fragment>

}