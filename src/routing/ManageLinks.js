

import React from "react"
import {DocumentContextProvider} from "../hooks/DocumentContextProvider"
import {LinkForm} from "../pages/LinkForm"
import {LINK_TYPE} from "../pages/constants"
import {WOQLClientObj} from '../init-woql-client'

export const ManageLinks = () => {
    const {
        language
	} = WOQLClientObj()

    let config = {
        listTab: language.VIEW_LINK_LIST,
        viewTab: language.VIEW_CLICKED_LINK,
        editTab: language.EDIT_CLICKED_LINK,
        createTab: language.CREATE_LINK_TAB,
        type: language.LINK_TYPE
    }

    return <DocumentContextProvider params={config}>
        <LinkForm/>
    </DocumentContextProvider>
}

