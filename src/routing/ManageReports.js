

import React from "react"
import {DocumentContextProvider} from "../hooks/DocumentContextProvider"
import {Reports} from "../pages/Reports"


export const ManageReports = () => {
    let config = {}

    return <DocumentContextProvider params={config}>
        <Reports/>
    </DocumentContextProvider>
}

