
import React, {useState, useEffect, createRef} from "react"
import {MapContainer, TileLayer,  MapControl, withLeaflet, GeoJSON, Polyline} from 'react-leaflet'
import {LATITUDE, LONGITUDE, ARROW_OPTIONS, MARKER_OPTIONS, MAP_OPTIONS, POINTS, POLYGON, LAT, LNG, REFRESH} from "./constants"
import "leaflet-arrowheads"
import {PolyLineLeafletMap} from "./PolyLineLeafletMap"
import {LeafletMap} from "./LeafletMap"

export const Viewer = ({documents, zoom=13, scrollWheelZoom, display, onMarkerClick, polyLine, children}) => {
	const [mapRef, setMapRef] = useState(createRef())
	const [map, setMap] = useState(null)

	let type=POINTS
	if(display) type=display

    if(!Array.isArray(documents)) {
        return <React.Fragment>{"Please, Include valid documents to display on map"}</React.Fragment>
    }
    if(!documents.length) {
        return <React.Fragment>{"Cannot display empty documents on map"}</React.Fragment>
    }

	return <React.Fragment>
		{
			documents && !polyLine &&
				<LeafletMap documents={documents} onMarkerClick = {onMarkerClick}/>
		}
		{
			polyLine && <PolyLineLeafletMap polyLine={polyLine} onMarkerClick = {onMarkerClick}/>
		}
	</React.Fragment>



}


/*
return <MapContainer
		ref={mapRef}
		scrollWheelZoom = { scrollWheelZoom }
		fullscreenControl = {true}
		center= { [ documents[0][LAT] , documents[0][LNG] ] }
		zoom={zoom}
		whenCreated={setMap}
	>
		<TileLayer
			attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
		/>

		{/*<GeoJSON data={dump}/>*//*}
		{/*<Legend map={map} children={children} />*//*}
		{renderPositions(documents, onMarkerClick, polyLine)}

	</MapContainer>
	*/



	/*if(polyLine && Array.isArray(polyLine)) {

			// Draw markers
			polyLine.map(pl => {
				if(!pl.hasOwnProperty("data")) return
				pl.data.map(data => {
					let coord = {lat: data.lat, lng: data.lng}
					let marker = L.marker(coord , markerOptions)
						.bindPopup(`### name: ${coord.name} lat: ${coord.lat} lng: ${coord.lng}`)
						.on('click', function(e) {
							//let cData = coord.id
							let cData = coord
							cData[REFRESH] = Date.now()
							if(onMarkerClick) onMarkerClick(cData)
						})
					marker.addTo(map)
				})
			})

			// extracting only lat lng
			polyLine.map(pl => { // working
				let vectorCoords = []
				pl.data.map(arr => {
					vectorCoords.push([arr.lat, arr.lng])
				})
				vectorJson.push({color: pl.color, data: vectorCoords})
			})
		} */