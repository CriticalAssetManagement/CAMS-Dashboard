

import React from "react"
import {DocumentContextProvider} from "../hooks/DocumentContextProvider"
import {AreaForm} from "../pages/AreaForm"
import {
    VIEW_CLICKED_AREA,
    VIEW_AREA_LIST ,
    CREATE_AREA_TAB,
    AREA_TYPE,
    EDIT_CLICKED_AREA
} from "../pages/constants"

export const ManageArea = () => {
    let config = {
        listTab: VIEW_AREA_LIST,
        viewTab: VIEW_CLICKED_AREA,
        editTab: EDIT_CLICKED_AREA,
        createTab: CREATE_AREA_TAB,
        type: AREA_TYPE
    }

    return <DocumentContextProvider params={config}>
        <AreaForm/>
    </DocumentContextProvider>
}

