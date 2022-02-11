

import React from "react"
import {DocumentContextProvider} from "../hooks/DocumentContextProvider"
import {AssetForm} from "../pages/AssetForm"
import {
    VIEW_CLICKED_ASSET,
    VIEW_ASSET_LIST ,
    CREATE_ASSET_TAB,
    ASSET_TYPE,
    EDIT_CLICKED_ASSET
} from "../pages/constants"

export const ManageAsset = () => {
    let config = {
        listTab: VIEW_ASSET_LIST,
        viewTab: VIEW_CLICKED_ASSET,
        editTab: EDIT_CLICKED_ASSET,
        createTab: CREATE_ASSET_TAB,
        type: ASSET_TYPE
    }

    return <DocumentContextProvider params={config}>
        <AssetForm/>
    </DocumentContextProvider>
}

