import React from "react"
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"

export const Form = ({frames, type, mode, onSubmit, onSelect, formData}) => {
    return <FrameViewer frame={frames}
        type={type}
        mode={mode}
        onSubmit={onSubmit}
        onSelect={onSelect}
        formData={formData}
    />
}