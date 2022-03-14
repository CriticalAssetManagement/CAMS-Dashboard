// map icon component
import L from "leaflet"


// map icons
export const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
})

// MAP id for ref
export const MAP_ID = "map-leaflet-id-polylines"

// Map variables
export const LATITUDE="Latitude"
export const LONGITUDE="Longitude"
export const LNG="lng"
export const LAT="lat"
export const REFRESH="refresh"
export const POINTS="Points"

// Map configs
export const MAP_OPTIONS = {
	center: [15.2999988, -61.3833318],
	zoom: 11,
	zoomDelta: 0.5,
	zoomSnap: 0,
	wheelPxPerZoomLevel: 100
}
// Options for the marker
export const MARKER_OPTIONS = {
	clickable: true,
	icon: icon
}

export const ARROW_OPTIONS = {
	yawn: 50, 				// width of the opening of the arrowhead
	size: '4%', 			// size of the arrowhead.
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
	"color": "#842029",
	"pulseColor": "#FFFFFF",
	"paused": false,
	"reverse": false,
	"hardwareAccelerated": true
  }

export const POPUP_OPTIONS = {
	maxWidth: '500',
	className : 'map-leaflet-popup'
}

