
import React, {useState, useEffect, useRef , createRef} from "react"
import {MapContainer, TileLayer,  MapControl, withLeaflet, GeoJSON, Polyline} from 'react-leaflet'
import {LATITUDE, LONGITUDE, MAP_ID, ARROW_OPTIONS, MARKER_OPTIONS, MAP_OPTIONS, POINTS, POLYGON, LAT, LNG, REFRESH} from "./constants"
import "leaflet-arrowheads"

export const PolyLineLeafletMap = ({polyLine, onMarkerClick}) => {
    const mapRef = useRef(MAP_ID)

    console.log("polyLine", polyLine)

    useEffect(() => {
		map()
	}, [])

    const map = () => {
		const map = L.map(mapRef.current , MAP_OPTIONS)
		let vectorJson = []

		const tileLayer = new L.TileLayer(
			"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
			{
				attribution:
				'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
			}
		)

		tileLayer.addTo(map)

		if(polyLine && Array.isArray(polyLine)) {

            // Draw markers
			polyLine.map(pl => {
				if(!pl.hasOwnProperty("data")) return
				pl.data.map(arr => {
					let linkArray = arr
					linkArray.map(la => {
						// get marker lat lng
						let coord = {lat: la.lat, lng: la.lng}
						let marker = L.marker(coord , MARKER_OPTIONS)
						    .bindPopup(`### name: ${coord.name} lat: ${coord.lat} lng: ${coord.lng}`)
						    .on('click', function(e) {
                                let cData = la //coord
                                cData[REFRESH] = Date.now()
                                if(onMarkerClick) onMarkerClick(cData)
                            })
						marker.addTo(map)
					})
				})
			})

			// extracting only lat lng
			polyLine.map(pl => {
				let vectorCoords = []
				pl.data.map(arr => {
					let linkArray = arr
					linkArray.map(la => {
						vectorCoords.push([la.lat, la.lng])
					})
				})
				vectorJson.push({color: pl.color, title: pl.title, data: vectorCoords})
			})
		}

		window.map = map

		// get vector and add arrows
		function getVector (vector) { // working
			let layerJson = {}
			vector.map(vc => {
				var things = L.polyline(vc.data , { color: vc.color })
					.arrowheads(ARROW_OPTIONS)
					.bindPopup(
						`<code>var simpleVector0: L.polyline(coords).arrowheads()</code>`,
						{ maxWidth: 2000 }
					)

				layerJson[vc.title] = things.addTo(map)
			})
			return layerJson
		}


		L.control
			.layers(null, getVector(vectorJson),  {position: 'bottomleft'})
			.addTo(map)

	}


    return <div id={mapRef.current} style={{ height: "100vh" }}></div>
}