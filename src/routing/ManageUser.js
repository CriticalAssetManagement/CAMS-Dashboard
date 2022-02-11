

import React from "react"
import {DocumentContextProvider} from "../hooks/DocumentContextProvider"
import {UserForm} from "../pages/UserForm"
import {
    VIEW_USER_LIST,
    VIEW_CLICKED_USER,
    CREATE_USER_TAB,
    EDIT_CLICKED_USER,
    USER_TYPE
} from "../pages/constants"

export const ManageUser = () => {
    let config = {
        listTab: VIEW_USER_LIST,
        viewTab: VIEW_CLICKED_USER,
        editTab: EDIT_CLICKED_USER,
        createTab: CREATE_USER_TAB,
        type: USER_TYPE
    }

    return <DocumentContextProvider params={config}>
        <UserForm/>
    </DocumentContextProvider>
}

