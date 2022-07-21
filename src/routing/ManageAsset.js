

import React from "react"
import {DocumentContextProvider} from "../hooks/DocumentContextProvider"
import {AssetForm} from "../pages/AssetForm"
import {ASSET_TYPE} from "../pages/constants"
import {WOQLClientObj} from '../init-woql-client'

export const ManageAsset = () => {
    const {
        language
	} = WOQLClientObj()

    let config = {
        listTab: language.VIEW_ASSET_LIST,
        viewTab: language.VIEW_CLICKED_ASSET,
        editTab: language.EDIT_CLICKED_ASSET,
        createTab: language.CREATE_ASSET_TAB,
        type: ASSET_TYPE
    }

    return <DocumentContextProvider params={config}>
        <AssetForm/>
    </DocumentContextProvider>
}

