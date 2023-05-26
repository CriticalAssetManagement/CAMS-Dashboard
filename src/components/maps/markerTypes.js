// map icon component
import * as L from "leaflet";
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css'
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.min.js'

const MARKER_COLOR='#e194ff' //'blue-dark' //cyan/ green-dark
const ICON_SIZE='fa-2x'
const ICON_COLOR= '#00008b'//'#62ff97'
 

// Asset Type Icons 
// Creates Others icon
export const OTHERS_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: MARKER_COLOR,
    prefix: 'fa',
    icon: 'fa-ellipsis-h',
    iconColor: ICON_COLOR,
    iconRotate: 0,
    extraClasses: ICON_SIZE,
    number: '',
    shadowSize: [0, 0],
    svg: true
})


// Creates Transportation icon
export const TRANSPORTATION_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: MARKER_COLOR,
    prefix: 'fa',
    icon: 'fa-truck',
    iconColor: ICON_COLOR,
    iconRotate: 0,
    extraClasses: ICON_SIZE,
    number: '',
    shadowSize: [0, 0],
    svg: true
})

// Creates Communications icon
export const COMMUNICATIONS_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: MARKER_COLOR,
    prefix: 'fa',
    icon: 'fa-satellite-dish',
    iconColor: ICON_COLOR,
    iconRotate: 0,
    extraClasses: ICON_SIZE,
    number: '',
    shadowSize: [0, 0],
    svg: true
})

// Creates food health and medical icon
export const HEALTH_AND_MEDICAL_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: MARKER_COLOR,
    prefix: 'fa',
    icon: 'fa-briefcase-medical',
    iconColor: ICON_COLOR,
    iconRotate: 0,
    extraClasses: ICON_SIZE,
    number: '',
    shadowSize: [0, 0],
    svg: true
})

// Creates an food water and shelter icon
export const FOOD_WATER_SHELTER_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: MARKER_COLOR,
    prefix: 'fa',
    icon: 'fa-utensils',
    iconColor: ICON_COLOR,
    iconRotate: 0,
    extraClasses: ICON_SIZE,
    number: '',
    shadowSize: [0, 0],
    svg: true
})

// Creates an Security and safety icon
export const SAFETY_AND_SECURITY_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: MARKER_COLOR,
    prefix: 'fa',
    icon: 'fa-shield-alt',
    iconColor: ICON_COLOR,
    iconRotate: 0,
    extraClasses: ICON_SIZE,
    number: '',
    shadowSize: [0, 0],
    svg: true
})

// Creates an Energy icon
export const ENERGY_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: MARKER_COLOR,
    prefix: 'fa',
    icon: 'fa-lightbulb',
    iconColor: ICON_COLOR,
    iconRotate: 0,
    extraClasses: ICON_SIZE,
    number: '',
    svg: true,
    shadowSize: [0, 0]
})

// Creates an Building icon
export const GOVERNMENT_BUILDINGS_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: MARKER_COLOR,
    prefix: 'fa',
    icon: 'fa-regular fa-hotel',
    iconColor: ICON_COLOR,
    iconRotate: 0,
    extraClasses: ICON_SIZE,
    number: '',
    shadowSize: [0, 0],
    svg: true
})

// Creates an Ports icon
export const MARINE_PORTS_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: MARKER_COLOR,
    prefix: 'fa',
    icon: 'fa-anchor',
    iconColor: ICON_COLOR,
    iconRotate: 0,
    extraClasses: ICON_SIZE,
    number: '',
    shadowSize: [0, 0],
    svg: true
})

// Creates an Airport icon
export const AIRPORT_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: MARKER_COLOR,
    prefix: 'fa',
    icon: 'fa-plane',
    iconColor: ICON_COLOR,
    iconRotate: 0,
    extraClasses: ICON_SIZE,
    number: '',
    shadowSize: [0, 0],
    svg: true
})


// Creates an Electrical plant icon
export const ELECTRICAL_POWER_GENERATING_PLANTS_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: MARKER_COLOR,
    prefix: 'fa',
    icon: 'fa-bolt',
    iconColor: ICON_COLOR,
    iconRotate: 0,
    extraClasses: ICON_SIZE,
    number: '',
    shadowSize: [0, 0],
    svg: true
})

// Creates an water system  icon
export const WATER_DISTRIBUTION_SYSTEM_ICON = L.ExtraMarkers.icon({
    shape: 'circle',
    markerColor: MARKER_COLOR,
    prefix: 'fa',
    icon: 'fa-water',
    iconColor: ICON_COLOR,
    iconRotate: 0,
    extraClasses: ICON_SIZE,
    number: '',
    shadowSize: [0, 0],
    svg: true
})









