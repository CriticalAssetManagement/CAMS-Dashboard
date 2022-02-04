const TerminusDBClient = require("@terminusdb/terminusdb-client")

export const getAssetLocationQuery = (documentID) => {

    let WOQL= TerminusDBClient.WOQL

    return WOQL.triple("v:Rel", "@schema:dependent", documentID)
        .triple("v:Rel", "@schema:depends_on", "v:DependantOn")
        .triple("v:DependantOn", "@schema:location", "v:Loc")
        .triple("v:Loc", "@schema:geo_location", "v:GeoLoc")
        .triple("v:GeoLoc", "@schema:latitude", "v:Latitude")
        .triple("v:GeoLoc", "@schema:longitude", "v:Longitude")
}