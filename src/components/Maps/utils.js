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
    UPWARD_LINKS_COLOR
} from "../constants"
import "leaflet-arrowheads"
import "leaflet.browser.print/dist/leaflet.browser.print.js"
import {getGradeIcons, getAssetTypeIcons} from "./icons"

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
                svg: true,
                shadowSize: [0, 0]
            })
        }
        return gradedOptions
    }
    return options
}

// get colored failure chain markers
function getLinkedMarkerOptions (asset , key) {
    let options=getAssetTypeIcons(asset, key)
    return options
}

// get pop up content
export function getPopContent (coord){
    return `<div>
        <div> name:  ${coord.name} </div>
        <div> lat:   ${coord.lat} </div>
        <div> lng:   ${coord.lng}</div>
    </div>`
}

// draw marker
function drawMarkers (asset, coord, options, setOnMarkerClick, layerGroup) {
    // create a marker
    let marker = L.marker(coord , options)
        .bindPopup(getPopContent(coord), options)
        .on('click', function(e) {
            let cData = asset
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
        if(uca[VAR_LINKED_ASSET] !== onMarkerClick.id) return
        if(uca.hasOwnProperty(VAR_LINKED_ASSET) && uca[VAR_LINKED_ASSET] === onMarkerClick.id) {
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
        if(uca["Asset"] === onMarkerClick.id) return
        if(uca["LinkedAsset"] === onMarkerClick.id) return

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
        if(fcs[VAR_ASSET] !== onMarkerClick.id) {
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
export function  gatherVectorLines(vector, displayFailureChains, displayUpwardChains, layerGorup, onMarkerClick) {
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
            var  antPolyline = L.polyline.antPath(gatherUpwardFailureLinked, UPWARD_DASH_LINES_OPTIONS)

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

// export and draw vectors
export function extractAndDrawVectors(polyLine, setOnMarkerClick, layerGorup) {
    let vectorJson = []
    if(polyLine && Array.isArray(polyLine)) {
        drawPolyLineMarkers(polyLine, setOnMarkerClick, layerGorup)
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
            options = getLinkedMarkerOptions(link, VAR_LINKED_ASSET_TYPE)
            let marker = drawMarkers(link, coord, options, null, layerGroup)
        })
    }
 }

 // draw upward chains
export function drawUpwardChainMarkers (displayUpwardChains, layerGroup) {
    //console.log("displayUpwardChains",displayUpwardChains)
    if(displayUpwardChains && Array.isArray(displayUpwardChains) && displayUpwardChains.length) {
        var options=MARKER_OPTIONS
        displayUpwardChains.map(linkChains => {

            var link = linkChains
            var coord = {
                name:link[VAR_ASSET_NAME],
                lat: link[ASSET_LAT],
                lng: link[ASSET_LNG]
            }
            // Asset
            options = getLinkedMarkerOptions(link, VAR_ASSET_TYPE)
            let marker = drawMarkers(link, coord, options, null, layerGroup)

            var coord = {
                name:link[VAR_LINKED_ASSET_NAME],
                lat: link[VAR_LINKED_ASSET_LAT],
                lng: link[VAR_LINKED_ASSET_LNG]
            }
            // Linked Asset
            options = getLinkedMarkerOptions(link, VAR_LINKED_ASSET_TYPE)
            let linkedAssetMarker = drawMarkers(link, coord, options, null, layerGroup)
        })
    }
}


// function to draw polyline markers
export function drawPolyLineMarkers(polyLine, setOnMarkerClick, layerGroup) {
    polyLine.map(pl => {
        if(!pl.hasOwnProperty("data")) return
        var options=MARKER_OPTIONS
        pl.data.map(arr => {
            let linkArray = arr
            linkArray.map(la => {
                // get marker lat lng
                let coord = {name: la[VAR_NAME], lat: la[VAR_LATITUDE], lng: la[VAR_LONGITUDE]}
                options = getMarkerOptions(la)
                let marker = drawMarkers(la, coord, options, setOnMarkerClick, layerGroup)
            })
        })
    })
}

// get all markers
export function getMarkers (assets, layerGroup, setOnMarkerClick) {
    //console.log("assets", assets)
    assets.map(asset => {
        // get marker lat lng
        let coord = {name:asset[VAR_NAME], lat: asset[VAR_LATITUDE], lng: asset[VAR_LONGITUDE]}
        let options = getMarkerOptions(asset)
        let marker = drawMarkers(asset, coord, options, setOnMarkerClick, layerGroup)
    })
}
