const TerminusDBClient = require("@terminusdb/terminusdb-client")
import {getCriticalButtons} from "./utils"
import {LNG, LAT, VAR_ASSET_IDENTIFIER, VAR_DESIGN_STANDARDS, VAR_LAST_MAINTAINED, VAR_DESCRIPTION, VAR_ASSET_TYPE} from "./constants"
import {ASSET_TYPE, OWNER_TYPE, USER_TYPE, LINK_TYPE} from "../pages/constants"

function getColumnsFromResults (documents) {
    let columns = []
    for(var k in documents[0]) columns.push(k)
    return columns
}

// get table config for asset lists in Home Page
export function getCriticalAssetConfig(documents, onRowClick, renderAssetType, language) {

    if(!language) return

    if(documents.length){
        const tConf= TerminusDBClient.View.table()
        tConf.pager("remote")
        tConf.pagesize(20)

        let columns = getColumnsFromResults(documents)
        
        //console.log("***columns", columns, language)
        
        tConf.column_order(...columns)
        tConf.column("Id").header("ID")
        tConf.column("Asset").header(language.ASSET_FORM)
        tConf.column("Name").header(language.NAME_LABEL)
        tConf.column("AssetType").header(language.ASSET_TYPE_LABEL)
        tConf.column(LAT).hidden(true)
        tConf.column(LNG).hidden(true)
        tConf.column("Critical").hidden(true)
        tConf.column("id").hidden(true)
        tConf.column(VAR_ASSET_IDENTIFIER).hidden(true)
        tConf.column(VAR_DESIGN_STANDARDS).hidden(true)
        tConf.column(VAR_LAST_MAINTAINED).hidden(true)
        tConf.column(VAR_DESCRIPTION).hidden(true)
        
        // display decoded asset type strings
        tConf.column(VAR_ASSET_TYPE).render(renderAssetType)

        //if(onRowClick) tConf.row().click(onRowClick) // disabling rowclick of rows to display ownr info
        return tConf
    }
}

/**
 * 
 * @param {*} frames - frames of CAMS data product
 * @param {*} type - type of document of interest 
 * @returns - returns label in which property is to be displayed in UI 
 */
 export function getLabelFromDocumentation (frames, type) {
	if(!frames) return {}
	if(frames.hasOwnProperty(type)) {
        if(frames[type].hasOwnProperty("@documentation")) {
            if(frames[type]["@documentation"].hasOwnProperty("@properties")) {
                return frames[type]["@documentation"]["@properties"]
            }
        }
	}
	return {}
}

// get table config for user lists in user form Page
export function getUserConfig(documents, onRowClick, frames) {
    if(documents.length){ 
        const tConf= TerminusDBClient.View.table()
        tConf.pager("remote")
        tConf.pagesize(20)

        let columns = getColumnsFromResults(documents)
        tConf.column_order(...columns)
        tConf.column("@id").header("ID")
        tConf.column("@type").hidden(true)

        // header names based on language
        let documentation = getLabelFromDocumentation(frames, USER_TYPE)
        for(var doc in documentation) {
            columns.map(col => {
                if(col === doc) {
                    // check for labels 
                    tConf.column(col).header(documentation[doc])
                }
            })
        }
        //tConf.column("@id").hidden(true)
        if(onRowClick) tConf.row().click(onRowClick)
        return tConf
    }
}


// get table config for links lists in user form Page
export function getLinksConfig(documents, onRowClick, frames) {
    if(documents.length){ 
        const tConf= TerminusDBClient.View.table()
        tConf.pager("remote")
        tConf.pagesize(20)

        let columns = getColumnsFromResults(documents)
        tConf.column_order(...columns)
        tConf.column("@id").header("ID")
        tConf.column("@type").hidden(true)

        // header names based on language
        let documentation = getLabelFromDocumentation(frames, LINK_TYPE)
        for(var doc in documentation) {
            columns.map(col => {
                if(col === doc) {
                    // check for labels 
                    tConf.column(col).header(documentation[doc])
                }
            })
        }
        //tConf.column("@id").hidden(true)
        if(onRowClick) tConf.row().click(onRowClick)
        return tConf
    }
}

// get table config for owner lists in owner form Page
export function getOwnerConfig(documents, onRowClick, frames) {
    if(documents.length){
        const tConf= TerminusDBClient.View.table()
        tConf.pager("remote")
        tConf.pagesize(20)

        let columns = getColumnsFromResults(documents)
        tConf.column_order(...columns)
        tConf.column("@id").header("ID")
        tConf.column("@type").hidden(true)

        let documentation = getLabelFromDocumentation(frames, OWNER_TYPE)
        // header names based on language
        for(var doc in documentation) {
            columns.map(col => {
                if(col === doc) {
                    // check for labels 
                    tConf.column(col).header(documentation[doc])
                }
            })
        }

        if(onRowClick) tConf.row().click(onRowClick)
        return tConf
    }
}

// get table config for area lists in Area Form Page
export function getAreaConfig(documents, onRowClick) {
    if(documents.length){
        const tConf= TerminusDBClient.View.table()
        tConf.pager("remote")
        tConf.pagesize(20)

        tConf.column("@id").hidden(true)

        let columns = getColumnsFromResults(documents)
        tConf.column_order(...columns)
        tConf.column("@id").header("ID")
        tConf.column("@type").hidden(true)

        if(onRowClick) tConf.row().click(onRowClick)
        return tConf
    }
}

// get table config for Asset lists in Area Form Page
export function getAssetConfig(documents, onRowClick, renderDates, frames) {
    if(documents.length){
        const tConf= TerminusDBClient.View.table()
        tConf.pager("remote")
        tConf.pagesize(20)

        let columns = getColumnsFromResults(documents)
        tConf.column_order(...columns)
        tConf.column("@id").header("ID")
        tConf.column("@type").hidden(true)

        let documentation = getLabelFromDocumentation(frames, ASSET_TYPE)
        // header names based on language
        for(var doc in documentation) {
            columns.map(col => {
                if(col === doc) {
                    // check for labels 
                    tConf.column(col).header(documentation[doc])
                }
            })
        }

        // hide fields
        //tConf.column("@id").hidden(true)
        tConf.column("location").hidden(true)
        tConf.column("owner").hidden(true)

        // rendering date fields 
        tConf.column("last_maintained").render(renderDates)
        tConf.column("last_modified").render(renderDates)
        tConf.column("commisioning_date").render(renderDates)

        if(onRowClick) tConf.row().click(onRowClick)
        return tConf
    }
}


// get table config for reports in report page
export function getReportsConfig (documents, language) {
    if(documents.length){
        const tConf= TerminusDBClient.View.table()
        tConf.pager("remote")
        tConf.pagesize(20)

        let columns = getColumnsFromResults(documents)
        
        tConf.column_order(...columns)
        tConf.column("@id").hidden(true)
        tConf.column("Asset").header(language.ASSET_FORM)
        tConf.column("Name").header(language.NAME_LABEL)
        tConf.column("AssetIdentifier").header(language.ASSET_IDENTIFIER_LABEL)
        tConf.column("Critical").header(language.CRITICAL_LABEL)

        return tConf
    }
}