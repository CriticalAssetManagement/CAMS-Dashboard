

import React from "react"
import {DocumentContextProvider} from "../hooks/DocumentContextProvider"
import {OwnerForm} from "../pages/OwnerForm"
import {OWNER_TYPE} from "../pages/constants"
import {WOQLClientObj} from '../init-woql-client'

export const ManageOwner = () => {
    const {
        language
	} = WOQLClientObj()

    let config = {
        listTab: language.VIEW_OWNER_LIST,
        viewTab: language.VIEW_CLICKED_OWNER,
        editTab: language.EDIT_CLICKED_OWNER,
        createTab: language.CREATE_OWNER_TAB,
        type: OWNER_TYPE
    }

    return <DocumentContextProvider params={config}>
        <OwnerForm/>
    </DocumentContextProvider>
}

