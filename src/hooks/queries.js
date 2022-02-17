const TerminusDBClient = require("@terminusdb/terminusdb-client")

// query to show dependency relations between assets
export const getAssetDependentOnQuery = (documentID) =>{
    let WOQL= TerminusDBClient.WOQL
    return WOQL.triple("v:DependencyRelation", "@schema:depends_on", documentID)
        .triple("v:DependencyRelation", "@schema:critical", "v:Critical")
        .triple("v:DependencyRelation", "@schema:dependent", "v:Asset")
        .triple("v:Asset", "@schema:name", "v:Name")
        .triple("v:Asset", "@schema:location", "v:DependentLocation")
        .triple("v:DependentLocation", "@schema:geometry_location", "v:Point")
        .triple("v:Point", "@schema:coordinates", "v:Coordinates")
        .triple("v:Coordinates", "sys:value", "v:Value")
        .triple("v:Coordinates", "sys:index", "v:Index")
}

// query to filter dependencies based on critical/ non critical
export const filterStatusDependencyQuery = (documentID, critical) =>{
    let WOQL= TerminusDBClient.WOQL
    return WOQL.triple("v:DependencyRelation", "@schema:depends_on", documentID)
        .triple("v:DependencyRelation", "@schema:critical", critical)
        .triple("v:DependencyRelation", "@schema:critical", "v:Critical")
        .triple("v:DependencyRelation", "@schema:dependent", "v:Asset")
        .triple("v:Asset", "@schema:name", "v:Name")
        .triple("v:Asset", "@schema:location", "v:DependentLocation")
        .triple("v:DependentLocation", "@schema:geometry_location", "v:Point")
        .triple("v:Point", "@schema:coordinates", "v:Coordinates")
        .triple("v:Coordinates", "sys:value", "v:Value")
        .triple("v:Coordinates", "sys:index", "v:Index")
}

//query to get asset by id
export const filterAssetsByIDQuery=(assets) => {
    let WOQL= TerminusDBClient.WOQL
    let documentID=assets
    return WOQL.triple("v:Asset", "rdf:type","@schema:Asset").eq("v:Asset", documentID)
        .triple("v:Asset", "@schema:location", "v:Location")
        .triple("v:Asset", "@schema:name", "v:Name")
        .triple("v:Location", "@schema:geometry_location", "v:Point")
        .triple("v:Point", "@schema:coordinates", "v:Coordinates")
        .triple("v:Coordinates", "sys:value", "v:Value")
        .triple("v:Coordinates", "sys:index", "v:Index")
}


//query to get all assets
export const getAvailableAssets = () => {
    let WOQL= TerminusDBClient.WOQL
    return WOQL.triple("v:Asset", "rdf:type","@schema:Asset")
        .triple("v:Asset", "@schema:name", "v:Name")
        .triple("v:Asset", "@schema:location", "v:Location")
        .triple("v:Location", "@schema:geometry_location", "v:Point")
        .triple("v:Point", "@schema:coordinates", "v:Coordinates")
        .triple("v:Coordinates", "sys:value", "v:Value")
        .triple("v:Coordinates", "sys:index", "v:Index")
}




//to c array val for coordinates
//triple("Array_8ce4bb1279bfdec43a11dec861e0e4fd3257382cabb1c7dc0a0880bebabb9d2a", "v:A", "v:C")
