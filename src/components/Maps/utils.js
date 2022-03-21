import {LATITUDE, LONGITUDE, DASH_LINES_OPTIONS, MAP_ID, ARROW_OPTIONS, MARKER_OPTIONS, MAP_OPTIONS, POINTS, POLYGON, LAT, LNG, REFRESH, POPUP_OPTIONS}  from "./constants"
import {CRITICAL_LINKS, VAR_NAME, NON_CRITICAL_LINKS, NON_CRITICAL_COLOR, CRITICAL_COLOR, VAR_GRADE} from ".././constants"
import "leaflet-arrowheads"
import "leaflet.browser.print/dist/leaflet.browser.print.js"
import {ICON, BG_CHILI_ICON, BG_RED_ICON, BG_BURGUNDY_ICON,BG_AMBER_ICON, BG_DIJON_ICON,BG_FIRE_ICON, BG_GOLD_ICON} from "./markers"

// get vector and add arrows critical and non critical lines
export function  gatherVectorLines(vector, displayFailureChains, layerGorup) {
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

        layerJson[CRITICAL_LINKS] = things.addTo(layerGorup)
    }
    //layer control for non critical links
    if (vectorControl[NON_CRITICAL_LINKS].length) {
        var things = L.polyline(vectorControl[NON_CRITICAL_LINKS] , { color: NON_CRITICAL_COLOR})
            .arrowheads(ARROW_OPTIONS)
            .bindPopup(
                `<code>var simpleVector0: L.polyline(coords).arrowheads()</code>`,
                { maxWidth: 2000 }
            )

        layerJson[NON_CRITICAL_LINKS] = things.addTo(layerGorup)
    }

    //console.log("displayFailureChains",displayFailureChains)

    // display Failure Chains
    if(displayFailureChains && Array.isArray(displayFailureChains )) {
        let gatherLinkedChains=[]
        displayFailureChains.map(linkChains => {
            if(Array.isArray(linkChains)) gatherLinkedChains.push(linkChains)
        })

        //gatherLinkedChains.length === 1 means its the last node in chain - so we dont display
        // /commenting for now && gatherLinkedChains.length > 1
        if (Array.isArray(gatherLinkedChains) ) {
            // add dashed lines to map to show indirect links
            var  antPolyline = L.polyline.antPath(gatherLinkedChains, DASH_LINES_OPTIONS)
            layerJson["Failure Nodes"] = antPolyline.addTo(layerGorup)
        }

    }
    return layerJson
}

// export and draw vectors
export function extractAndDrawVectors(polyLine, setOnMarkerClick, layerGorup) {
    let vectorJson = []
    if(polyLine && Array.isArray(polyLine)) {
        drawPolyLine(polyLine, setOnMarkerClick, layerGorup)
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
export function drawFailureChains (displayFailureChains, layerGroup) {
    // gather failure chain markers
    if(displayFailureChains && Array.isArray(displayFailureChains )) {
        displayFailureChains.map(linkChains => {
            if(Array.isArray(linkChains)){
                linkChains.map(link => {
                    let coord = { name:link[VAR_NAME], lat: link.lat, lng: link.lng }
                    let marker = L.marker(coord , MARKER_OPTIONS)
                        //.bindPopup(`### name:${coord.name} lat: ${coord.lat} lng: ${coord.lng}`)
                        .bindPopup(getPopContent(coord), POPUP_OPTIONS)
                        .on('click', function(e) {
                            let cData = link //coord
                            cData[REFRESH] = Date.now()
                            //map.setView(e.latlng, 13)
                            if(setOnMarkerClick) setOnMarkerClick(cData)
                        })
                    marker.on('mouseover',function(ev) { // on hover
                        marker.openPopup()
                    })
                    marker.addTo(layerGroup)
                })
            }
        })
    }
}


// function to draw polyline markers
export function drawPolyLine(polyLine, setOnMarkerClick, layerGroup) {
    polyLine.map(pl => {
        if(!pl.hasOwnProperty("data")) return
        pl.data.map(arr => {
            let linkArray = arr
            linkArray.map(la => {
                // get marker lat lng
                let coord = {name: la[VAR_NAME], lat: la.lat, lng: la.lng}
                let marker = L.marker(coord , MARKER_OPTIONS)
                    //.bindPopup(`### name: ${coord.name} lat: ${coord.lat} lng: ${coord.lng}`)
                    .bindPopup(getPopContent(coord), POPUP_OPTIONS)
                    .on('click', function(e) {
                        let cData = la //coord
                        cData[REFRESH] = Date.now()
                        //mapComponent.setView(e.latlng, 13) // zoom in on click
                        if(setOnMarkerClick) setOnMarkerClick(cData)
                    })
                marker.on('mouseover',function(ev) { // on hover
                    marker.openPopup()
                })
                marker.addTo(layerGroup)
            })
        })
    })
}


// get pop up content
export function getPopContent (coord){
    return `<div>
        <div> name:  ${coord.name} </div>
        <div> lat:   ${coord.lat} </div>
        <div> lng:   ${coord.lng}</div>
    </div>`
}

// get colored markers if grade is available
function getMarkerOptions(asset) {
    var options=MARKER_OPTIONS
    if(asset.hasOwnProperty(VAR_GRADE)) {
        if(asset[VAR_GRADE] === 1) {
            options = {
                icon: BG_AMBER_ICON
            }
        }
        else if(asset[VAR_GRADE] === 2) {
            options = {
                icon: BG_DIJON_ICON
            }
        }
        else if(asset[VAR_GRADE] === 3) {
            options = {
                icon: BG_RED_ICON
            }
        }
        else if(asset[VAR_GRADE] === 4) {
            options = {
                icon: BG_CHILI_ICON
            }
        }
        else if(asset[VAR_GRADE] === 5) {
            options = {
                icon: BG_BURGUNDY_ICON
            }
        }
    }
    return options
}

// get all markers
export function getMarkers (assets, layerGroup, setOnMarkerClick) {
    //console.log("assets", assets)
    assets.map(asset => {
        // get marker lat lng
        let coord = {name:asset[VAR_NAME] ,lat: asset.lat, lng: asset.lng}

        let options = getMarkerOptions(asset)
        let marker = L.marker(coord , options)
            //.bindPopup(`### name: ${coord.name} lat: ${coord.lat} lng: ${coord.lng}`)
            .bindPopup(getPopContent(coord), POPUP_OPTIONS)
            .on('click', function(e) {
                let cData = asset //coord
                cData[REFRESH] = Date.now()
                //map.setView(e.latlng, 13)
                if(setOnMarkerClick) setOnMarkerClick(cData)
            })
            .addTo(layerGroup)

        marker.on('mouseover',function(ev) { // on hover
            marker.openPopup()
        })
    })
}
