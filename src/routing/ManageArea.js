

import React from "react"
import {DocumentContextProvider} from "../hooks/DocumentContextProvider"
import {AreaForm} from "../pages/AreaForm"
import {AREA_TYPE} from "../pages/constants"
import {WOQLClientObj} from '../init-woql-client'

export const ManageArea = () => {
    const {
        language
	} = WOQLClientObj()

    let config = {
        listTab: language.VIEW_AREA_LIST,
        viewTab: language.VIEW_CLICKED_AREA,
        editTab: language.EDIT_CLICKED_AREA,
        createTab: language.CREATE_AREA_TAB,
        type: AREA_TYPE
    }

    return <DocumentContextProvider params={config}>
        <AreaForm/>
    </DocumentContextProvider>
}

