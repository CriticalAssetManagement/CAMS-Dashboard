import React from "react"
import {MapViewer} from "@terminusdb/terminusdb-documents-ui"

export const Map = ({documents, display, setOnMarkerClick, polyLine, zoom, children}) => {

    /**
     * id - Document ID
     * latitude - latitude of Document ID
     * longitude - longitude of Document ID
     */
    function handleMarkerClick (data) {
        if(setOnMarkerClick) setOnMarkerClick(data)
    }

    return <MapViewer
        documents={documents}
        zoom={zoom}
        scrollWheelZoom={true}
        display={display}
        polyLine={polyLine}
        children={children}
        onMarkerClick={handleMarkerClick}
    />
}