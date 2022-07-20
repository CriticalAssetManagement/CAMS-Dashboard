import React from "react"
import {
    LATITUDE,
    LONGITUDE,
    DASH_LINES_OPTIONS,
    UPWARD_DASH_LINES_OPTIONS,
    MAP_ID,
    ARROW_OPTIONS,
    MARKER_OPTIONS,
    MAP_OPTIONS,
    POINTS,
    POLYGON,
    LAT,
    LNG,
    REFRESH,
    POPUP_OPTIONS
}  from "./constants"
import {
    CRITICAL_LINKS,
    FAILURE_CHAIN_LINKS,
    VAR_NAME,
    NON_CRITICAL_LINKS,
    NON_CRITICAL_COLOR,
    CRITICAL_COLOR,
    VAR_GRADE,
    VAR_ASSET,
    ASSET_LAT,
    ASSET_LNG,
    VAR_LINKED_ASSET_LNG,
    VAR_LINKED_ASSET_LAT,
    VAR_LINKED_ASSET_NAME,
    VAR_LONGITUDE,
    VAR_LATITUDE,
    VAR_ASSET_TYPE,
    VAR_LINKED_ASSET,
    VAR_LINKED_ASSET_TYPE,
    VAR_ASSET_NAME,
    UPWARD_TITLE,
    UPWARD_FAILURE_CHAIN_TITLE,
    UPWARD_LINKS_COLOR,
    VAR_OWNER
} from "../constants"
import "leaflet-arrowheads"
import "leaflet.browser.print/dist/leaflet.browser.print.js"
import {getGradeIcons, getAssetTypeIcons} from "./icons"
import {antPath} from 'leaflet-ant-path'
export const ExtraMarkers = L.ExtraMarkers

// get colored markers if grade and asset tfype avail
function getMarkerOptions(asset, language) {
    var options=MARKER_OPTIONS
    if(asset.hasOwnProperty(VAR_ASSET_TYPE)) {
        options=getAssetTypeIcons(asset, VAR_ASSET_TYPE, language)
    }
    
    if(asset.hasOwnProperty(VAR_GRADE)) {
        let gradeColor=getGradeIcons(asset)
        // create a new icon with the grade color
        
        let icon = options.icon.options.icon
        /*let gradedOptions = {
            icon: L.ExtraMarkers.icon({
                shape: 'circle',
                markerColor: gradeColor,
                prefix: 'fa',
                icon: icon,
                iconColor: "#fff",
                iconRotate: 0,
                extraClasses: 'fa-2x',
                number: '',
                svg: true,
                shadowSize: [0, 0]
            })
        }*/
        //this is a temporary solution L loast ExtraMarkers 
        //We have to investigate this better
        //do not remove before fix the problem!!!!
        L.ExtraMarkers = ExtraMarkers
        let gradedOptions = {
            icon: L.ExtraMarkers.icon({
                shape: 'circle',
                markerColor: gradeColor,
                prefix: 'fa',
                icon: icon,
                iconColor: "#fff",
                iconRotate: 0,
                extraClasses: 'fa-2x',
                number: '',
                svg: true,
                shadowSize: [0, 0]
        })
    }
   
        return gradedOptions
    }
    return options
}

// get colored failure chain markers
function getLinkedMarkerOptions (asset , key, language) {
    let options=getAssetTypeIcons(asset, key, language)
    return options
}

// get pop up content
export function getPopContent (coord){
 
    let element = [], ownerElement = []

    // Owner info available
    if(coord.hasOwnProperty("owner")) {
        if(Array.isArray(coord["owner"]) && coord["owner"].length > 0) {
            coord["owner"].map(owner => {
                if(Array.isArray(owner) && owner.length > 0) {
                    owner.map(item => {
                        if(typeof item === "object") {
                            if(item.hasOwnProperty("@value")) {
                                ownerElement.push(`<span>${item["@value"]}</span>`)
                            }
                        }
                    })
                }
            })
        }
    }

    element.push(`<span> name:  ${coord[VAR_NAME]} </span>`)
    
    if(ownerElement.length > 0) element.push(`<span> owners: ${ownerElement} </span>`)
    return `<span>${element}</span>`
}

// draw marker
function drawMarkers (asset, coord, options, setOnMarkerClick, layerGroup) {
    // create a marker
    //console.log("asset, coord", asset, coord)
    let marker = L.marker(coord , options)
        .bindPopup(getPopContent(coord), options)
        .on('click', function(e) {
            //let cData = asset 
            let cData = {}
            // on click of marker value is stored in coord
            cData[VAR_ASSET]=coord[VAR_ASSET]
            cData[VAR_NAME]=coord[VAR_NAME]
            cData[VAR_ASSET_TYPE]=coord[VAR_ASSET_TYPE]
            cData[VAR_LATITUDE]=coord[VAR_LATITUDE]
            cData[VAR_LONGITUDE]=coord[VAR_LONGITUDE]
            cData[REFRESH] = Date.now()
            //map.setView(e.latlng, 13)
            if(setOnMarkerClick) setOnMarkerClick(cData)
        })
        .addTo(layerGroup)
    // on hover
    marker.on('mouseover',function(ev) {
        marker.openPopup()
    })
    return marker
}

// upward chains directly linked
function gatherDirectlyLinkedUpwardChain (upwardChainArray, onMarkerClick) {
    let modifiedUpwardChainArray=[]
    if(!onMarkerClick) return
    upwardChainArray.map( uca => {
        // direct links
        if(uca[VAR_LINKED_ASSET] !== onMarkerClick[VAR_ASSET]) return
        if(uca.hasOwnProperty(VAR_LINKED_ASSET) && uca[VAR_LINKED_ASSET] === onMarkerClick[VAR_ASSET]) {
            modifiedUpwardChainArray.push([
                [ uca[ASSET_LAT], uca[ASSET_LNG] ],
                [ uca[VAR_LINKED_ASSET_LAT], uca[VAR_LINKED_ASSET_LNG] ]
            ])
        }
    })
    return modifiedUpwardChainArray
}

// upward chains failure linked
function gatherLinkedUpwardFailureChain (upwardChainArray, onMarkerClick) {
    let modifiedUpwardFailureChainArray=[]
    if(!onMarkerClick) return
    upwardChainArray.map( uca => {
        // direct links
        if(uca["Asset"] === onMarkerClick[VAR_ASSET]) return
        if(uca["LinkedAsset"] === onMarkerClick[VAR_ASSET]) return

        modifiedUpwardFailureChainArray.push([
            [ uca[ASSET_LAT], uca[ASSET_LNG] ],
            [ uca[VAR_LINKED_ASSET_LAT], uca[VAR_LINKED_ASSET_LNG] ]
        ])
    })
    return modifiedUpwardFailureChainArray
}

// modifying failureChainArray to draw lines in leaflet map format
function gatherFailureLines(failureChainArray, onMarkerClick) {
    let modifiedFailureChainArray=[]
    // write a function here to check if all keys are available to display map
    if(!onMarkerClick) return
    failureChainArray.map(fcs => {
        if(fcs[VAR_ASSET] !== onMarkerClick[VAR_ASSET]) {
            modifiedFailureChainArray.push([
                [ fcs[ASSET_LAT], fcs[ASSET_LNG] ],
                [ fcs[VAR_LINKED_ASSET_LAT], fcs[VAR_LINKED_ASSET_LNG] ]
            ])
        }
    })
    //console.log("modifiedFailureChainArray", modifiedFailureChainArray)
    return modifiedFailureChainArray
}

// get vector and add arrows critical and non critical lines
export function  gatherVectorLines_cordd(vector, displayFailureChains, displayUpwardChains, layerGorup, onMarkerClick) {
    let layerJson = {}
    let vectorControl = {
        [CRITICAL_LINKS]: [],
        [NON_CRITICAL_LINKS]: [] 
    }

    vector.map(vc => {
        if(vc.title === CRITICAL_LINKS) {
            vectorControl[CRITICAL_LINKS].push(vc.data)
        }
        else if (vc.title === NON_CRITICAL_LINKS) {
            vectorControl[NON_CRITICAL_LINKS].push(vc.data)
        }
    })

    //layer control for critical links
    if(vectorControl[CRITICAL_LINKS].length) {
        var things = L.polyline(vectorControl[CRITICAL_LINKS] , { color: CRITICAL_COLOR})
            .arrowheads(ARROW_OPTIONS)
            .bindPopup(
                `<code>var simpleVector0: L.polyline(coords).arrowheads()</code>`,
                { maxWidth: 2000 }
            )

        layerJson[
            `<span class='my-layer-item'>${CRITICAL_LINKS}</span>
                <i style='background: ${CRITICAL_COLOR};
                    width: 10px;
                    height: 10px;
                    float: left;
                    margin-right: 8px;
                    margin-top: 3px;'/>`
        ] = things.addTo(layerGorup)

    }
    //layer control for non critical links
    if (vectorControl[NON_CRITICAL_LINKS].length) {
        var things = L.polyline(vectorControl[NON_CRITICAL_LINKS] , { color: NON_CRITICAL_COLOR})
            .arrowheads(ARROW_OPTIONS)
            .bindPopup(
                `<code>var simpleVector0: L.polyline(coords).arrowheads()</code>`,
                { maxWidth: 2000 }
            )

        layerJson[
            `<span class='my-layer-item'>${NON_CRITICAL_LINKS}</span>
                <i style='background: ${NON_CRITICAL_COLOR};
                    width: 10px;
                    height: 10px;
                    float: left;
                    margin-right: 8px;
                    margin-top: 3px;'/>`
        ] = things.addTo(layerGorup)
    }

    //console.log("displayFailureChains",displayFailureChains)

    // display Failure Chains
    if(displayFailureChains && Array.isArray(displayFailureChains) && displayFailureChains.length>0) {
        let gatherLinkedChains=[]
        gatherLinkedChains=gatherFailureLines(displayFailureChains, onMarkerClick)

        if (Array.isArray(gatherLinkedChains) ) {
            // add dashed lines to map to show indirect links
            var  antPolyline = antPath(gatherLinkedChains, DASH_LINES_OPTIONS)
            layerJson[
                `<span class='my-layer-item'>${FAILURE_CHAIN_LINKS}</span>
                <i style='display: inline-block;
                    border-top: 10px solid #ffffffff;
                    border-right: 10px solid #800000;
                    width: 10px;
                    height: 10px;
                    float: left;
                    opacity: 0.5;
                    margin-right: 8px;
                    margin-top: 3px;'/>`
            ] = antPolyline.addTo(layerGorup)

        }
    }

    // display upward chains
    if(displayUpwardChains && Array.isArray(displayUpwardChains) && displayUpwardChains.length) {
        let gatherDirectlyLinked=[], gatherUpwardFailureLinked=[]
        gatherDirectlyLinked=gatherDirectlyLinkedUpwardChain(displayUpwardChains, onMarkerClick)

        // when no upward links available to clicked asset
        if(Array.isArray(gatherDirectlyLinked) && gatherDirectlyLinked.length === 0) return layerJson

        var things = L.polyline(gatherDirectlyLinked , { color: UPWARD_LINKS_COLOR})
            .arrowheads(ARROW_OPTIONS)
            .bindPopup(
                `<code>var simpleVector0: L.polyline(coords).arrowheads()</code>`,
                { maxWidth: 2000 }
            )

        layerJson[
            `<span class='my-layer-item'>${UPWARD_TITLE}</span>
                <i style='background: ${UPWARD_LINKS_COLOR};
                    width: 10px;
                    height: 10px;
                    float: left;
                    margin-right: 8px;
                    margin-top: 3px;'/>`
        ] = things.addTo(layerGorup)

        gatherUpwardFailureLinked=gatherLinkedUpwardFailureChain(displayUpwardChains, onMarkerClick)
        if (Array.isArray(gatherUpwardFailureLinked) ) {
            // add dashed lines to map to show indirect links
            //var  antPolyline = L.polyline.antPath(gatherUpwardFailureLinked, UPWARD_DASH_LINES_OPTIONS)
            var  antPolyline = antPath(gatherUpwardFailureLinked, UPWARD_DASH_LINES_OPTIONS)

            layerJson[
                `<span class='my-layer-item'>${UPWARD_FAILURE_CHAIN_TITLE}</span>
                <i style='display: inline-block;
                    border-top: 10px solid #ffffffff;
                    border-right: 10px solid #133333;
                    width: 10px;
                    height: 10px;
                    float: left;
                    opacity: 0.5;
                    margin-right: 8px;
                    margin-top: 3px;'/>`
            ] = antPolyline.addTo(layerGorup) 

        }

    }
    return layerJson
}

export function  gatherVectorLines(vector, displayFailureChains, displayUpwardChains, layerGorup, onMarkerClick, language) {
    let layerJson = {}
    let vectorControl = {
        [CRITICAL_LINKS]: [],
        [NON_CRITICAL_LINKS]: [] 
    }

    vector.map(vc => {
        if(vc.title === CRITICAL_LINKS) {
            vectorControl[CRITICAL_LINKS].push(vc.data)
        }
        else if (vc.title === NON_CRITICAL_LINKS) {
            vectorControl[NON_CRITICAL_LINKS].push(vc.data)
        }
    })

    //layer control for critical links
    if(vectorControl[CRITICAL_LINKS].length) {
        var things = L.polyline(vectorControl[CRITICAL_LINKS] , { color: CRITICAL_COLOR})
            .arrowheads(ARROW_OPTIONS)
            .bindPopup(
                `<code>var simpleVector0: L.polyline(coords).arrowheads()</code>`,
                { maxWidth: 2000 }
            )

        layerJson[
            `<span class='my-layer-item'>${language.CRITICAL_LINKS}</span>
                <i style='background: ${CRITICAL_COLOR};
                    width: 10px;
                    height: 10px;
                    float: left;
                    margin-right: 8px;
                    margin-top: 3px;'/>`
        ] = things.addTo(layerGorup)

    }
    //layer control for non critical links
    if (vectorControl[NON_CRITICAL_LINKS].length) {
        var things = L.polyline(vectorControl[NON_CRITICAL_LINKS] , { color: NON_CRITICAL_COLOR})
            .arrowheads(ARROW_OPTIONS)
            .bindPopup(
                `<code>var simpleVector0: L.polyline(coords).arrowheads()</code>`,
                { maxWidth: 2000 }
            )

        layerJson[
            `<span class='my-layer-item'>${language.NON_CRITICAL_LINKS}</span>
                <i style='background: ${NON_CRITICAL_COLOR};
                    width: 10px;
                    height: 10px;
                    float: left;
                    margin-right: 8px;
                    margin-top: 3px;'/>`
        ] = things.addTo(layerGorup)
    }

    //console.log("displayFailureChains",displayFailureChains)

    // display Failure Chains
    if(displayFailureChains && Array.isArray(displayFailureChains) && displayFailureChains.length>0) {
        let gatherLinkedChains=[]
        gatherLinkedChains=gatherFailureLines(displayFailureChains, onMarkerClick)

        if (Array.isArray(gatherLinkedChains) ) {
            // add dashed lines to map to show indirect links
            var  antPolyline = antPath(gatherLinkedChains, DASH_LINES_OPTIONS)
            layerJson[
                `<span class='my-layer-item'>${language.FAILURE_CHAIN_LINKS}</span>
                <i style='display: inline-block;
                    border-top: 10px solid #ffffffff;
                    border-right: 10px solid #800000;
                    width: 10px;
                    height: 10px;
                    float: left;
                    opacity: 0.5;
                    margin-right: 8px;
                    margin-top: 3px;'/>`
            ] = antPolyline.addTo(layerGorup)

        }
    }

    // display upward chains
    if(displayUpwardChains && Array.isArray(displayUpwardChains) && displayUpwardChains.length) {
        let gatherDirectlyLinked=[], gatherUpwardFailureLinked=[]
        gatherDirectlyLinked=gatherDirectlyLinkedUpwardChain(displayUpwardChains, onMarkerClick)

        // when no upward links available to clicked asset
        if(Array.isArray(gatherDirectlyLinked) && gatherDirectlyLinked.length === 0) return layerJson

        var things = L.polyline(gatherDirectlyLinked , { color: UPWARD_LINKS_COLOR})
            .arrowheads(ARROW_OPTIONS)
            .bindPopup(
                `<code>var simpleVector0: L.polyline(coords).arrowheads()</code>`,
                { maxWidth: 2000 }
            )

        layerJson[
            `<span class='my-layer-item'>${language.UPWARD_TITLE}</span>
                <i style='background: ${UPWARD_LINKS_COLOR};
                    width: 10px;
                    height: 10px;
                    float: left;
                    margin-right: 8px;
                    margin-top: 3px;'/>`
        ] = things.addTo(layerGorup)

        gatherUpwardFailureLinked=gatherLinkedUpwardFailureChain(displayUpwardChains, onMarkerClick)
        if (Array.isArray(gatherUpwardFailureLinked) ) {
            // add dashed lines to map to show indirect links
            //var  antPolyline = L.polyline.antPath(gatherUpwardFailureLinked, UPWARD_DASH_LINES_OPTIONS)
            var  antPolyline = antPath(gatherUpwardFailureLinked, UPWARD_DASH_LINES_OPTIONS)

            layerJson[
                `<span class='my-layer-item'>${language.UPWARD_FAILURE_CHAIN_TITLE}</span>
                <i style='display: inline-block;
                    border-top: 10px solid #ffffffff;
                    border-right: 10px solid #133333;
                    width: 10px;
                    height: 10px;
                    float: left;
                    opacity: 0.5;
                    margin-right: 8px;
                    margin-top: 3px;'/>`
            ] = antPolyline.addTo(layerGorup) 

        }

    }
    return layerJson
}

// export and draw vectors
export function extractAndDrawVectors(polyLine, setOnMarkerClick, layerGorup, language) {
    let vectorJson = []
    if(polyLine && Array.isArray(polyLine)) {
        drawPolyLineMarkers(polyLine, setOnMarkerClick, layerGorup, language)
        // extracting only lat lng
        polyLine.map(pl => {
            pl.data.map(arr => {
                let linkArray = arr
                vectorJson.push({color: pl.color, title: pl.title, data: linkArray})
            })
        })
    }
    return vectorJson
}

// draw failure chains
export function drawFailureChains (displayFailureChains, setOnMarkerClick, layerGroup, language) {
    // gather failure chain markers
    if(displayFailureChains && Array.isArray(displayFailureChains) && displayFailureChains.length>0) {
        var options=MARKER_OPTIONS
        displayFailureChains.map(linkChains => {
            //console.log("linkChains", linkChains)
            var link = linkChains
            let coord = {
                [VAR_NAME]: link[VAR_LINKED_ASSET_NAME],
                [VAR_ASSET]:link[VAR_LINKED_ASSET], 
                [VAR_ASSET_TYPE]: link [VAR_LINKED_ASSET_TYPE],
                lat: link[VAR_LINKED_ASSET_LAT],
                lng: link[VAR_LINKED_ASSET_LNG]
            }
            options = getLinkedMarkerOptions(link, VAR_LINKED_ASSET_TYPE, language)
            let marker = drawMarkers(link, coord, options, setOnMarkerClick, layerGroup)
        })
    }
 }

 // draw upward chains
export function drawUpwardChainMarkers (displayUpwardChains, setOnMarkerClick, layerGroup, language) {
    
    if(displayUpwardChains && Array.isArray(displayUpwardChains) && displayUpwardChains.length) {
        var options=MARKER_OPTIONS
        displayUpwardChains.map(linkChains => {

            var link = linkChains
           
            var coord = {
                [VAR_NAME]:link[VAR_NAME],
                [VAR_ASSET]:link[VAR_ASSET], 
                [VAR_ASSET_TYPE]: link [VAR_ASSET_TYPE],
                lat: link[ASSET_LAT],
                lng: link[ASSET_LNG]
            }
            // Asset
            options = getLinkedMarkerOptions(link, VAR_ASSET_TYPE, language)
            let marker = drawMarkers(link, coord, options, setOnMarkerClick, layerGroup)

            var coord = {
                [VAR_ASSET]:link[VAR_LINKED_ASSET], 
                [VAR_ASSET_TYPE]: link [VAR_LINKED_ASSET_TYPE],
                [VAR_NAME]:link[VAR_LINKED_ASSET_NAME],
                lat: link[VAR_LINKED_ASSET_LAT],
                lng: link[VAR_LINKED_ASSET_LNG]
            }
            // Linked Asset
            options = getLinkedMarkerOptions(link, VAR_LINKED_ASSET_TYPE, language)
            let linkedAssetMarker = drawMarkers(link, coord, options, setOnMarkerClick, layerGroup)
        })
    }
}


// function to draw polyline markers
export function drawPolyLineMarkers(polyLine, setOnMarkerClick, layerGroup, language) {
    polyLine.map(pl => {
        if(!pl.hasOwnProperty("data")) return
        var options=MARKER_OPTIONS
        pl.data.map(arr => {
            let linkArray = arr
            linkArray.map(la => {
                // get marker lat lng
                let coord = {
                    [VAR_ASSET]: la[VAR_ASSET],
                    [VAR_ASSET_TYPE]: la[VAR_ASSET_TYPE],
                    [VAR_NAME]: la[VAR_NAME], 
                    lat: la[VAR_LATITUDE], 
                    lng: la[VAR_LONGITUDE]
                }
                options = getMarkerOptions(la, language)
                let marker = drawMarkers(la, coord, options, setOnMarkerClick, layerGroup)
            })
        })
    })
}

// get all markers
export function getMarkers (assets, layerGroup, setOnMarkerClick, language) {
    //console.log("assets", assets)
    assets.map(asset => {
        // get marker lat lng
        let coord = {
            [VAR_ASSET]:asset[VAR_ASSET], 
            [VAR_NAME]:asset[VAR_NAME], 
            [VAR_ASSET_TYPE]: asset[VAR_ASSET_TYPE],
            lat: asset[VAR_LATITUDE], 
            lng: asset[VAR_LONGITUDE], 
            owner: asset[VAR_OWNER]
        }
        let options = getMarkerOptions(asset, language)
        let marker = drawMarkers(asset, coord, options, setOnMarkerClick, layerGroup)
    })
}



/*if (Array.isArray(gatherLinkedChains) ) { // es5 ant path code 
    // add dashed lines to map to show indirect links
    var  antPolyline = L.polyline.antPath(gatherLinkedChains, DASH_LINES_OPTIONS)

    layerJson[
        `<span class='my-layer-item'>${FAILURE_CHAIN_LINKS}</span>
        <i style='display: inline-block;
            border-top: 10px solid #ffffffff;
            border-right: 10px solid #800000;
            width: 10px;
            height: 10px;
            float: left;
            opacity: 0.5;
            margin-right: 8px;
            margin-top: 3px;'/>`
    ] = antPolyline.addTo(layerGorup)

}*/

