import React from "react"
import {MapViewer} from "@terminusdb/terminusdb-documents-ui"

export const Map = ({documents, display}) => {
    return <MapViewer
        documents={documents}
        zoom={11}
        scrollWheelZoom={true}
        display={"Points"}
    />
}