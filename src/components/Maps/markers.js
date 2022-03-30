// map icon component
import L from "leaflet"
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css'
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.min.js'

// graded events color
export const BG_AMBER="#ffbf00"     // grade 1
export const BG_GOLD="#f9a602"      // grade 2
export const BG_FIRE="#fda50f"      // grade 3
export const BG_DIJON="#c49102"     // grade 4
export const BG_RED="#d30000"       // grade 5
export const BG_CHILI="#c21807"     // grade 6
export const BG_BURGUNDY="#8d021f"  // grade 7
export const BG_SANGRIA="#5e1914"   // grade 8

// map icons
export const ICON = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    /*shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
    shadowSize: [0, 0]*/
})

// Creates a BG_SANGRIA icon
export const BG_SANGRIA_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: BG_SANGRIA,
    prefix: 'icon',
    icon: ' archive',
    iconColor: 'fa-number',
    iconRotate: 0,
    extraClasses: '',
    number: '',
    svg: true
})

// Creates a BG_BURGUNDY icon
export const BG_BURGUNDY_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: BG_BURGUNDY,
    prefix: 'icon',
    icon: ' archive',
    iconColor: 'fa-number',
    iconRotate: 0,
    extraClasses: '',
    number: '5',
    svg: true
})

// Creates a BG_CHILI icon
export const BG_CHILI_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: BG_CHILI,
    prefix: 'icon',
    icon: 'fa-number',
    iconColor: '#fff',
    iconRotate: 0,
    extraClasses: '',
    number: '4',
    svg: true
})

// Creates a BG_RED icon
export const BG_RED_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: BG_RED,
    prefix: 'icon',
    icon: 'fa-number',
    iconColor: '#fff',
    iconRotate: 0,
    extraClasses: '',
    number: '3',
    svg: true
})

// Creates a BG_DIJON icon
export const BG_DIJON_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: BG_DIJON,
    prefix: 'icon',
    icon: 'fa-number',
    iconColor: '#fff',
    iconRotate: 0,
    extraClasses: '',
    number: '2',
    svg: true
})

// Creates a BG_FIRE icon
export const BG_FIRE_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: BG_FIRE,
    prefix: 'icon',
    icon: 'fa-number',
    iconColor: '#fff',
    iconRotate: 0,
    extraClasses: '',
    number: '',
    svg: true
})

// Creates a BG_GOLD icon
export const BG_GOLD_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: BG_GOLD,
    prefix: 'icon',
    icon: 'fa-number',
    iconColor: '#fff',
    iconRotate: 0,
    extraClasses: '',
    number: '',
    svg: true
})



// Creates a BG_AMBER icon
export const BG_AMBER_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: BG_AMBER,
    prefix: 'icon',
    icon: 'fa-number',
    iconColor: '#fff',
    iconRotate: 0,
    extraClasses: '',
    number: '1',
    svg: true
})



