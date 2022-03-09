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


//query to get asset by id
export const filterAssetsByIDQuery=(asset) => {
    let WOQL= TerminusDBClient.WOQL
    let documentID=asset
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

// query to get Owner info assosciated to an asset
export const getOwnerDetailsQuery = (asset) => {
    let WOQL= TerminusDBClient.WOQL
    let documentID=asset
    return WOQL.triple(documentID, "@schema:owner", "v:Owner")
        .triple("v:Owner", "@schema:name", "v:Name")
        .triple("v:Owner", "@schema:contact_person", "v:Person")
        .triple("v:Person", "@schema:phone_number", "v:PhoneNumber")
        .triple("v:Person", "@schema:email_address", "v:Email")
}

// query to get assets filtered by hazard events
export const getAssetsByEventsQuery = (events) => {
    let WOQL= TerminusDBClient.WOQL
    let qHazards = []
    events.map(event => {
        let eventName = encodeURI(event.value.trim())
        let hazard = `@schema:Hazard/${eventName}`
        let q = WOQL.triple("v:Asset", "@schema:applicable_hazards", hazard)
        qHazards.push(q)
    })

    return WOQL.and(
        WOQL.distinct ("v:Asset",
            WOQL.or(...qHazards)
        )
        .triple("v:Asset", "rdf:type","@schema:Asset")
        .triple("v:Asset", "@schema:name", "v:Name")
        .triple("v:Asset", "@schema:location", "v:Location")
        .triple("v:Location", "@schema:geometry_location", "v:Point")
        .triple("v:Point", "@schema:coordinates", "v:Coordinates")
        .triple("v:Coordinates", "sys:value", "v:Value")
        .triple("v:Coordinates", "sys:index", "v:Index")
    )

}

export const getAssetFailureChain = (asset) => {
    let WOQL=TerminusDBClient.WOQL
    let documentID=asset

    /*return WOQL.and (
        WOQL.path(documentID, "(<depends_on,dependent>)*", "v:Asset")
            .triple("v:Relation", "@schema:depends_on", "v:Asset")
            .triple("v:Relation", "@schema:dependent", "v:NewAsset")
    )*/

    return WOQL.and (
        WOQL.path(documentID, "(<depends_on,dependent>)*", "v:Asset")
            .triple("v:Relation", "@schema:depends_on", "v:Asset")
            .triple("v:Relation", "@schema:dependent", "v:LinkedAsset")
    )
    .triple("v:LinkedAsset", "@schema:name", "v:Name")
    .triple("v:LinkedAsset", "@schema:location", "v:Location")
    .triple("v:Location", "@schema:geometry_location", "v:Point")
    .triple("v:Point", "@schema:coordinates", "v:Coordinates")
    .triple("v:Coordinates", "sys:value", "v:Value")
    .triple("v:Coordinates", "sys:index", "v:Index")
}

// query to get complete path
    /*return WOQL.path(documentID, "(<depends_on,dependent>)+", "v:Asset", "v:Path")
        .triple("v:Asset", "rdf:type","@schema:Asset")
        .triple("v:Asset", "@schema:name", "v:Name")
        .triple("v:Asset", "@schema:location", "v:Location")
        .triple("v:Location", "@schema:geometry_location", "v:Point")
        .triple("v:Point", "@schema:coordinates", "v:Coordinates")
        .triple("v:Coordinates", "sys:value", "v:Value")
        .triple("v:Coordinates", "sys:index", "v:Index") */


/*

let hazard = "@schema:Hazard/Volcanos%20(incl.%20lahars,%20pyroclastic%20flows,%20volcanic%20activity)"

let hazard2 =  "@schema:Hazard/Pest%20Infestations"

and (
 distinct ("v:Asset",
   or(
     WOQL.triple("v:Asset", "@schema:applicable_hazards", hazard),
     WOQL.triple("v:Asset", "@schema:applicable_hazards", hazard2)
     )
   )
     .triple("v:Asset", "rdf:type","@schema:Asset")
           .triple("v:Asset", "@schema:name", "v:Name")
           .triple("v:Asset", "@schema:location", "v:Location")
           .triple("v:Location", "@schema:geometry_location", "v:Point")
           .triple("v:Point", "@schema:coordinates", "v:Coordinates")
           .triple("v:Coordinates", "sys:value", "v:Value")
           .triple("v:Coordinates", "sys:index", "v:Index")

 )*/



/*
let doc = "Asset/ASSET1"


path(doc, "(<depends_on,dependent>)+", "v:Y")



let doc = "Asset/ASSET1"


path(doc, "(<depends_on,dependent>)+", "v:Y", "v:Path") */


