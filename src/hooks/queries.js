const TerminusDBClient = require("@terminusdb/terminusdb-client")

export const getAssetLocationQuery = (documentID) => {
    let WOQL= TerminusDBClient.WOQL
    return WOQL.triple(documentID, "@schema:location", "v:Location")
        .triple(documentID, "@schema:name", "v:Name")
        .triple("v:Location", "@schema:geo_location", "v:GeoLocation")
        .triple("v:GeoLocation", "@schema:latitude", "v:Latitude")
        .triple("v:GeoLocation", "@schema:longitude", "v:Longitude")
}

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
