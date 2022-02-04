import React, {useState, useEffect} from 'react'
import {DATA_PRODUCT} from "../constants"
const TerminusDBClient = require("@terminusdb/terminusdb-client")
import {ASSET_TYPE, LATITUDE, LONGITUDE} from "../pages/constants"

export async function handleDocumentSelect(woqlClient, inp, type) {

    let WOQL= TerminusDBClient.WOQL

    var docType=`@schema:${type}`
    let q = WOQL.isa("v:Documents", docType)
    const results = await q.execute(woqlClient)
    .then((response) => {
        let options = []
        if(inp){
            response.bindings.map(thing => {
                if(thing["Documents"].toUpperCase().includes(inp.toUpperCase())){
                    options.push({value: thing["Documents"], label: thing["Documents"]})
                }
            })
        }
        else {
            response.bindings.map(thing => {
                options.push({value: thing["Documents"], label: thing["Documents"]})
            })
        }
        return options
    })
    .catch((error) => {
        console.log("query run error", error)
    })
    return results

}


//custom field for <FormViewer/>
export function CustomCuisineFieldTemplate(props) {
    const {id, classNames, label, help, required, description, errors, children} = props

    var css = "d-none"
    if(props.schema.title === "dependent") {
        css = "d-flex"
    }
    if(props.id === "root") css="d-flex"

    return (
        <div className={css}>
            {description}
            {children}
            {errors}
            {help}
        </div>
    )
}

// function to extract latitude and longitude from query results
export function extractLocations(results) {
    let docs = []
    if(!Array.isArray(results)) return docs
    results.map(item => {
        docs.push({
            latitude: item[LATITUDE]["@value"] ? item[LATITUDE]["@value"] : null,
            longitude: item[LONGITUDE]["@value"] ? item[LONGITUDE]["@value"] : null
        })
    })
    return docs
}

