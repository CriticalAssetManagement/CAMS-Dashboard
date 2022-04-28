import {ICON} from "./markers"

// MAP id for ref
export const MAP_ID = "map-leaflet-id-polylines"

// Map variables
export const LATITUDE="Latitude"
export const LONGITUDE="Longitude"
export const LNG="lng"
export const LAT="lat"
export const REFRESH="refresh"
export const POINTS="Points"

const CENTER=[15.2999988, -61.3833318] // Domanica
//const CENTER=[25.7617, -80.1918] // Miami

// Map configs
export const MAP_OPTIONS = {
	center: CENTER,
	zoom: 11,
	zoomDelta: 0.5,
	zoomSnap: 0,
	wheelPxPerZoomLevel: 100
}
// Options for the marker
export const MARKER_OPTIONS = {
	clickable: true,
	icon: ICON
}

export const ARROW_OPTIONS = {
	yawn: 50, 				// width of the opening of the arrowhead
	size: '1%', 			// size of the arrowhead.
	frequency: 2,			// How many arrowheads are rendered on a polyline.
	fill: 2,
	offsets: { end: "15px" }
}

export const DASH_LINES_OPTIONS = {
	"delay": 800,
	"dashArray": [
	  10,
	  20
	],
	"weight": 5,
	"color": "#ffff",
	"pulseColor": "#800000",
	"paused": false,
	"reverse": false,
	"hardwareAccelerated": true
}

export const UPWARD_DASH_LINES_OPTIONS = {
	"delay": 800,
	"dashArray": [
	  10,
	  20
	],
	"weight": 5,
	"color": "#ffff",
	"pulseColor": "#133333",
	"paused": false,
	"reverse": false,
	"hardwareAccelerated": true
}

export const POPUP_OPTIONS = {
	maxWidth: '500',
	className : 'map-leaflet-popup'
}

export const BROWSER_PRINT_OPTIONS = {
	title: "Print Map",
	documentTitle: "Map printed using leaflet.browser.print plugin",
	closePopupsOnPrint: false,
	manualMode: false,
	printModes: [ "Portrait", "Landscape"]
}



