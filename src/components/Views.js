const TerminusDBClient = require("@terminusdb/terminusdb-client")
import {getCriticalButtons} from "./utils"
import {LNG, LAT, VAR_ASSET_IDENTIFIER, VAR_DESIGN_STANDARDS, VAR_LAST_MAINTAINED, VAR_DESCRIPTION} from "./constants"

function getColumnsFromResults (documents) {
    let columns = []
    for(var k in documents[0]) columns.push(k)
    return columns
}



// get table config for asset lists in Home Page
export function getCriticalAssetConfig(documents, onRowClick) {
    if(documents.length){
        const tConf= TerminusDBClient.View.table()
        tConf.pager("remote")
        tConf.pagesize(20)

        let columns = getColumnsFromResults(documents)
        tConf.column_order(...columns)
        tConf.column("Id").header("ID")
        tConf.column(LAT).hidden(true)
        tConf.column(LNG).hidden(true)
        tConf.column("critical").hidden(true)
        tConf.column(VAR_ASSET_IDENTIFIER).hidden(true)
        tConf.column(VAR_DESIGN_STANDARDS).hidden(true)
        tConf.column(VAR_LAST_MAINTAINED).hidden(true)
        tConf.column(VAR_DESCRIPTION).hidden(true)

        if(onRowClick) tConf.row().click(onRowClick)
        return tConf
    }
}




// get table config for user lists in user form Page
export function getUserConfig(documents, onRowClick) {
    if(documents.length){
        const tConf= TerminusDBClient.View.table()
        tConf.pager("remote")
        tConf.pagesize(20)

        let columns = getColumnsFromResults(documents)
        tConf.column_order(...columns)
        tConf.column("@id").header("ID")
        tConf.column("@type").hidden(true)

        if(onRowClick) tConf.row().click(onRowClick)
        return tConf
    }
}

// get table config for owner lists in owner form Page
export function getOwnerConfig(documents, onRowClick) {
    if(documents.length){
        const tConf= TerminusDBClient.View.table()
        tConf.pager("remote")
        tConf.pagesize(20)

        let columns = getColumnsFromResults(documents)
        tConf.column_order(...columns)
        tConf.column("@id").header("ID")
        tConf.column("@type").hidden(true)

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

        let columns = getColumnsFromResults(documents)
        tConf.column_order(...columns)
        tConf.column("@id").header("ID")
        tConf.column("@type").hidden(true)

        if(onRowClick) tConf.row().click(onRowClick)
        return tConf
    }
}

// get table config for Asset lists in Area Form Page
export function getAssetConfig(documents, onRowClick) {
    if(documents.length){
        const tConf= TerminusDBClient.View.table()
        tConf.pager("remote")
        tConf.pagesize(20)

        let columns = getColumnsFromResults(documents)
        tConf.column_order(...columns)
        tConf.column("@id").header("ID")
        tConf.column("@type").hidden(true)

        if(onRowClick) tConf.row().click(onRowClick)
        return tConf
    }
}