import React, {useState, useEffect} from 'react'
const TerminusDBClient = require("@terminusdb/terminusdb-client")
import {VAR_DEPENDENT_ON, VAR_LATITUDE, LAT, LNG, VAR_LONGITUDE, VAR_NAME, VAR_CRITICAL, VAR_INDEX, VAR_ASSET, VAR_VALUE} from "./constants"
import {MdAddAlert} from "react-icons/md"

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

// function to modify results to be displayed in WOQLTable()
// example - only display id of subdocument in WOQLTable
export function displayResults(documentResults) {

    var extractedResults=[]
    documentResults.map(item=> {
        var newJson={}
        for(var key in item){
            if(Array.isArray(item[key])){
                /*var type = item[key][0]["@type"]
                if(frames[`terminusdb:///schema#${type}`] && frames[`terminusdb:///schema#${type}`]["@subdocument"]){
                    // this is a subdocument
                    var newArray=[]
                    item[key].map(thing => {
                        newArray.push(thing["@id"])
                    })
                    newJson[key]=newArray
                }*/
            }
            else if(item[key].hasOwnProperty("@id") && item[key]["@id"]){ // object
                newJson[key]=item[key]["@id"]
            }
            else {
                newJson[key]=item[key]
            }
        }
        extractedResults.push(newJson)
    })

    return extractedResults
}

export function getCriticalButtons(cell) {
    if(cell.row.original.critical === "true") { // critical is stored as string
        return <MdAddAlert className="text-danger"/>
    }
    return <MdAddAlert className="text-success"/>
}

// function to extract latitude and longitude from query results
export function extractLocations(id, results) {
    let docs = []
    if(!Array.isArray(results)) return docs
    results.map(item => {
        docs.push({
            lat: item[VAR_LATITUDE]["@value"] ? item[VAR_LATITUDE]["@value"] : null,
            lng: item[VAR_LONGITUDE]["@value"] ? item[VAR_LONGITUDE]["@value"] : null,
            id: item[VAR_DEPENDENT_ON] ?  item[VAR_DEPENDENT_ON] : id,
            name: item[VAR_NAME] ?  item[VAR_NAME]["@value"] : null,
            critical: item[VAR_CRITICAL] ? item[VAR_CRITICAL]["@value"] : null
        })
    })
    return docs
}


// function to extract latitude and longitude of all assets
export function extractAssetLocations(results) {
    let docs = [], json = {}
    if(!Array.isArray(results)) return docs

    results.map(item => {
        if(json.hasOwnProperty(item[VAR_ASSET])) { // if asset exists
            if(item[VAR_INDEX]["@value"] === 0) json[item[VAR_ASSET]][LAT] = item[VAR_VALUE]["@value"]
            if(item[VAR_INDEX]["@value"] === 1) json[item[VAR_ASSET]][LNG] = item[VAR_VALUE]["@value"]
        }
        else { // if asset dosent exists
            json[item[VAR_ASSET]] = {
                id: item[VAR_ASSET]
            }
            if(item[VAR_INDEX]["@value"] === 0) json[item[VAR_ASSET]][LAT] = item[VAR_VALUE]["@value"]
            if(item[VAR_INDEX]["@value"] === 1) json[item[VAR_ASSET]][LNG] = item[VAR_VALUE]["@value"]
            if(item.hasOwnProperty(VAR_NAME)) json[item[VAR_ASSET]]["name"] = item[VAR_NAME]["@value"]
            if(item.hasOwnProperty(VAR_CRITICAL)) {
                json[item[VAR_ASSET]]["critical"] = item[VAR_CRITICAL]["@value"].toString()
            }
        }
    })
    for(var things in json) {
        docs.push(json[things])
    }
    //console.log("docs", docs)
    return docs
}

export function getAssetSelectOptions(list) {
    if(!Array.isArray(list) && !list.length) return []
    let opts = []
    list.map(lst => {
        opts.push({value: lst.id, label: lst.id})
    })
    return opts
}





/***
 * triple("v:Asset", "rdf:type","@schema:Asset")
.triple("v:Asset", "@schema:location", "v:Location")
.triple("v:Location", "@schema:geometry_location", "v:Point")
.triple("v:Point", "@schema:coordinates", "v:Coordinate_x")
.triple("v:Point", "@schema:coordinates", "v:Coordinate_y")
.triple("v:Coordinate_x", "sys:value", "v:X")
.triple("v:Coordinate_x", "sys:index", "v:index_X")
//.cast("v:index_X", "xsd:decimal", "v:IX")
.triple("v:Coordinate_y", "sys:value", "v:Y")
.triple("v:Coordinate_y", "sys:index", "v:index_y")
//.cast("v:index_y", "xsd:decimal", "v:IY")
 */

