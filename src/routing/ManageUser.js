

import React from "react"
import {DocumentContextProvider} from "../hooks/DocumentContextProvider"
import {UserForm} from "../pages/UserForm"
import { Layout } from "../components/Layout"
import {
    USER_TYPE
} from "../pages/constants"
import {WOQLClientObj} from '../init-woql-client'

export const ManageUser = () => {
    // this is the application loading for the main object
    const {
        language
	} = WOQLClientObj()

   
    let config = {
        listTab: language.VIEW_USER_LIST,
        viewTab: language.VIEW_CLICKED_USER,
        editTab: language.EDIT_CLICKED_USER,
        createTab: language.CREATE_USER_TAB,
        type: USER_TYPE
    }
    
    return <DocumentContextProvider params={config}>
        <UserForm/>
    </DocumentContextProvider>
}

