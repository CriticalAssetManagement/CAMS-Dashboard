
import React, {useState, useEffect, createRef} from "react"
import {MapContainer, TileLayer,  MapControl, withLeaflet, GeoJSON, Polyline} from 'react-leaflet'
import {LATITUDE, LONGITUDE, ARROW_OPTIONS, MARKER_OPTIONS, MAP_OPTIONS, POINTS, POLYGON, LAT, LNG, REFRESH} from "./constants"
import "leaflet-arrowheads"
import {PolyLineLeafletMap} from "./PolyLineLeafletMap"

/*
**  documents            - Array of documents with latitudes and longitudes
**  zoom                 - zoom im map
**  scrollWheelZoom      - boolean to allow on scroll
*/



export const LeafletMap = ({documents, onMarkerClick}) => {

	useEffect(() => {
		map()
	}, [])

	const map = () => {
		const map = L.map("map-leaflet-id", MAP_OPTIONS)

		const tileLayer = new L.TileLayer(
			"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
			{
				attribution:
				'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
			}
		)

		tileLayer.addTo(map)

		//{id: 'Asset/Portsmouth%20Hospital', lat: 15.58333, name: 'Portsmouth', lng: -61.46667, refresh: 1646317993667}
		// Draw Markers
		documents.map(docs => {
			let coord = { id:docs.id, name: docs[VAR_NAME], lat: docs.lat, lng: docs.lng } // set lat and long
			let marker = L.marker(coord , MARKER_OPTIONS).bindPopup(`### name: ${coord.name} lat: ${coord.lat} lng: ${coord.lng}`).on('click', function(e) {
				//let cData = coord.id
				let cData = coord
				cData[REFRESH] = Date.now()
				if(onMarkerClick) onMarkerClick(cData)
			})
			marker.addTo(map)
		})

		window.map = map
	}

	return <div id="map-leaflet-id" style={{ height: "100vh" }}></div>
}