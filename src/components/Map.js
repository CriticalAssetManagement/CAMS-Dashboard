import React from "react"
//import {MapViewer} from "@terminusdb/terminusdb-documents-ui"
import {Viewer} from "./Maps/Viewer"

export const Map = ({documents, display, setOnMarkerClick, polyLine, zoom, children}) => {

    /**
     * id - Document ID
     * latitude - latitude of Document ID
     * longitude - longitude of Document ID
     */
    function handleMarkerClick (data) {
        if(setOnMarkerClick) setOnMarkerClick(data)
    }
    //console.log("polyLine", polyLine)

    return <Viewer
        documents={documents}
        zoom={zoom}
        scrollWheelZoom={true}
        display={display}
        polyLine={polyLine}
        children={children}
        onMarkerClick={handleMarkerClick}
    />
}