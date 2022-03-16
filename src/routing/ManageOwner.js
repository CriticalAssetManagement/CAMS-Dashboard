

import React from "react"
import {DocumentContextProvider} from "../hooks/DocumentContextProvider"
import {OwnerForm} from "../pages/OwnerForm"
import {
    VIEW_OWNER_LIST,
    VIEW_CLICKED_OWNER,
    CREATE_OWNER_TAB,
    EDIT_CLICKED_OWNER,
    OWNER_TYPE
} from "../pages/constants"

export const ManageOwner = () => {
    let config = {
        listTab: VIEW_OWNER_LIST,
        viewTab: VIEW_CLICKED_OWNER,
        editTab: EDIT_CLICKED_OWNER,
        createTab: CREATE_OWNER_TAB,
        type: OWNER_TYPE
    }

    return <DocumentContextProvider params={config}>
        <OwnerForm/>
    </DocumentContextProvider>
}

