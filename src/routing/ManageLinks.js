

import React from "react"
import {DocumentContextProvider} from "../hooks/DocumentContextProvider"
import {LinkForm} from "../pages/LinkForm"
import {
    VIEW_LINK_LIST,
    VIEW_CLICKED_LINK,
    CREATE_LINK_TAB,
    EDIT_CLICKED_LINK,
    LINK_TYPE
} from "../pages/constants"

export const ManageLinks = () => {
    let config = {
        listTab: VIEW_LINK_LIST,
        viewTab: VIEW_CLICKED_LINK,
        editTab: EDIT_CLICKED_LINK,
        createTab: CREATE_LINK_TAB,
        type: LINK_TYPE
    }

    return <DocumentContextProvider params={config}>
        <LinkForm/>
    </DocumentContextProvider>
}

