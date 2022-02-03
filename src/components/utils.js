import {useState, useEffect} from 'react'
import {DATA_PRODUCT} from "../constants"
const TerminusDBClient = require("@terminusdb/terminusdb-client")


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

