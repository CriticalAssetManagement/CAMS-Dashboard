import {
    LATITUDE,
    LONGITUDE,
    DASH_LINES_OPTIONS,
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
    VAR_LINKED_ASSET_TYPE
} from "../constants"
import "leaflet-arrowheads"
import "leaflet.browser.print/dist/leaflet.browser.print.js"
import {getGradeIcons, getAssetTypeIcons} from "./icons"

// modifying failureChainArray to draw lines in leaflet map format
function gatherFailureLines(failureChainArray, onMarkerClick) {
    let modifiedFailrueChainArray=[]
    // write a function here to check if all keys are available to display map
    if(!onMarkerClick) return
    failureChainArray.map(fcs => {
        if(fcs[VAR_ASSET] !== onMarkerClick.id) {
            modifiedFailrueChainArray.push([
                [ fcs[ASSET_LAT], fcs[ASSET_LNG] ],
                [ fcs[VAR_LINKED_ASSET_LAT], fcs[VAR_LINKED_ASSET_LNG] ]
            ])
        }
    })
    //console.log("modifiedFailrueChainArray", modifiedFailrueChainArray)
    return modifiedFailrueChainArray
}

// get vector and add arrows critical and non critical lines
export function  gatherVectorLines(vector, displayFailureChains, layerGorup, onMarkerClick) {
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
    if(displayFailureChains && Array.isArray(displayFailureChains)) {
        var options=MARKER_OPTIONS
        displayFailureChains.map(linkChains => {
            var link = linkChains
            let coord = {
                name:link[VAR_LINKED_ASSET_NAME],
                lat: link[VAR_LINKED_ASSET_LAT],
                lng: link[VAR_LINKED_ASSET_LNG]
            }
            options = getLinkedMarkerOptions(link)
            let marker = L.marker(coord , options)
                //.bindPopup(`### name:${coord.name} lat: ${coord.lat} lng: ${coord.lng}`)
                .bindPopup(getPopContent(coord), POPUP_OPTIONS)
                .on('click', function(e) {
                    let cData = link //coord
                    cData[REFRESH] = Date.now()
                    //map.setView(e.latlng, 13)
                    //if(setOnMarkerClick) setOnMarkerClick(cData)
                })
            marker.on('mouseover',function(ev) { // on hover
                marker.openPopup()
            })
            marker.addTo(layerGroup)
        })
    }
 }


// function to draw polyline markers
export function drawPolyLine(polyLine, setOnMarkerClick, layerGroup) {
    polyLine.map(pl => {
        if(!pl.hasOwnProperty("data")) return
        var options=MARKER_OPTIONS
        pl.data.map(arr => {
            let linkArray = arr
            linkArray.map(la => {
                // get marker lat lng
                let coord = {name: la[VAR_NAME], lat: la[VAR_LATITUDE], lng: la[VAR_LONGITUDE]}
                options = getMarkerOptions(la)
                let marker = L.marker(coord , options)
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

// get colored markers if grade and asset type avail
function getMarkerOptions(asset) {
    var options=MARKER_OPTIONS
    if(asset.hasOwnProperty(VAR_ASSET_TYPE)) {
        options=getAssetTypeIcons(asset, VAR_ASSET_TYPE)
    }
    if(asset.hasOwnProperty(VAR_GRADE)) {
        let gradeColor=getGradeIcons(asset)
        // create a new icon with the grade color
        let icon = options.icon.options.icon
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
                svg: true
            })
        }
        return gradedOptions
    }
    return options
}

// get colored failure chain markers
function getLinkedMarkerOptions (asset) {
    let options=getAssetTypeIcons(asset, VAR_LINKED_ASSET_TYPE)
    return options
}

// get all markers
export function getMarkers (assets, layerGroup, setOnMarkerClick) {
    //console.log("assets", assets)
    assets.map(asset => {
        // get marker lat lng
        let coord = {name:asset[VAR_NAME], lat: asset[VAR_LATITUDE], lng: asset[VAR_LONGITUDE]}

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
