const TerminusDBClient = require("@terminusdb/terminusdb-client")

// query to show dependency relations between assets
export const getAssetDependentOnQuery = (documentID) =>{
    let WOQL= TerminusDBClient.WOQL
    return WOQL.triple("v:DependencyRelation", "@schema:depends_on", documentID)
        .triple("v:DependencyRelation", "@schema:critical", "v:Critical")
        .triple("v:DependencyRelation", "@schema:dependent", "v:Asset")
        .triple("v:Asset", "@schema:name", "v:Name")
        .opt(WOQL.triple("v:Asset", "@schema:description", "v:Description"))
        .triple("v:Asset", "@schema:asset_identifier", "v:AssetIdentifier")
        .opt(WOQL.triple("v:Asset", "@schema:assetType", "v:AssetType"))
        .triple("v:Asset", "@schema:design_standards", "v:DesignStandards")
        .triple("v:Asset", "@schema:last_maintained", "v:LastMaintained")
        .triple("v:Asset", "@schema:location", "v:DependentLocation")
        .triple("v:DependentLocation", "@schema:geometry_location", "v:Point")
        .triple("v:Point", "@schema:coordinates", "v:AssetCoordinatesX")
        .triple("v:Point", "@schema:coordinates", "v:AssetCoordinatesY")
        .triple("v:AssetCoordinatesX", "sys:value", "v:AssetX")
        .triple("v:AssetCoordinatesX", "sys:index", "v:X_AssetX")
        .eq("v:X_AssetX", 0)
        .triple("v:AssetCoordinatesY", "sys:value", "v:AssetY")
        .triple("v:AssetCoordinatesY", "sys:index",  WOQL.literal(1, "xsd:nonNegativeInteger"))
}


//query to get all assets
export const getAvailableAssets = () => {
    let WOQL= TerminusDBClient.WOQL
    return WOQL.triple("v:Asset", "rdf:type","@schema:Asset")
        .triple("v:Asset", "@schema:name", "v:Name")
        .opt(WOQL.triple("v:Asset", "@schema:description", "v:Description"))
        .triple("v:Asset", "@schema:asset_identifier", "v:AssetIdentifier")
        .opt(WOQL.triple("v:Asset", "@schema:assetType", "v:AssetType"))
        .triple("v:Asset", "@schema:design_standards", "v:DesignStandards")
        .triple("v:Asset", "@schema:last_maintained", "v:LastMaintained")
        .triple("v:Asset", "@schema:location", "v:Location")
        .triple("v:Location", "@schema:geometry_location", "v:Point")
        .triple("v:Point", "@schema:coordinates", "v:AssetCoordinatesX")
        .triple("v:Point", "@schema:coordinates", "v:AssetCoordinatesY")
        .triple("v:AssetCoordinatesX", "sys:value", "v:AssetX")
        .triple("v:AssetCoordinatesX", "sys:index", "v:X_AssetX")
        .eq("v:X_AssetX", 0)
        .triple("v:AssetCoordinatesY", "sys:value", "v:AssetY")
        .triple("v:AssetCoordinatesY", "sys:index",  WOQL.literal(1, "xsd:nonNegativeInteger"))
}


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
export const getAssetsByEventsOrIDQuery = (event, asset) => {
    let WOQL= TerminusDBClient.WOQL
    let documentID=false, eventQuery=false
    if(asset) documentID=asset

    //console.log("event", event)

    if(event && Object.keys(event).length && event.hasOwnProperty("eventName")) {
        let eventName = encodeURI(event.eventName.trim())
        let hazard = `@schema:Hazard/${eventName}`
        eventQuery = WOQL.triple("v:Asset", "@schema:applicable_hazards", "v:Hazard")
            .triple("v:Hazard", "@schema:hazard", hazard)
            .opt(WOQL.triple("v:Hazard", "@schema:Grade", "v:Grade"))

        if(event.hasOwnProperty("grade") && event.grade){ // get grade match
            eventQuery.not(WOQL.greater("v:Grade", Number(event.grade)))
                //.less("v:Grade",  Number(event.grade))
            //eventQuery.triple("v:Hazard", "@schema:Grade", Number(event.grade))
        }
    }

    // filter by both ID and Event
    if(asset && eventQuery) {
        return eventQuery.triple("v:Asset", "rdf:type","@schema:Asset").eq("v:Asset", documentID)
            .triple("v:Asset", "rdf:type","@schema:Asset")
            .triple("v:Asset", "@schema:name", "v:Name")
            .opt(WOQL.triple("v:Asset", "@schema:description", "v:Description"))
            .opt(WOQL.triple("v:Asset", "@schema:assetType", "v:AssetType"))
            .triple("v:Asset", "@schema:location", "v:Location")
            .triple("v:Location", "@schema:geometry_location", "v:Point")
            .triple("v:Point", "@schema:coordinates", "v:AssetCoordinatesX")
            .triple("v:Point", "@schema:coordinates", "v:AssetCoordinatesY")
            .triple("v:AssetCoordinatesX", "sys:value", "v:AssetX")
            .triple("v:AssetCoordinatesX", "sys:index", "v:X_AssetX")
            .eq("v:X_AssetX", 0)
            .triple("v:AssetCoordinatesY", "sys:value", "v:AssetY")
            .triple("v:AssetCoordinatesY", "sys:index",  WOQL.literal(1, "xsd:nonNegativeInteger"))
    }
    else if (asset && !eventQuery) { // filter by ID alone
        return WOQL.triple("v:Asset", "rdf:type","@schema:Asset").eq("v:Asset", documentID)
            .triple("v:Asset", "rdf:type","@schema:Asset")
            .triple("v:Asset", "@schema:name", "v:Name")
            .opt(WOQL.triple("v:Asset", "@schema:description", "v:Description"))
            .opt(WOQL.triple("v:Asset", "@schema:assetType", "v:AssetType"))
            .triple("v:Asset", "@schema:location", "v:Location")
            .triple("v:Location", "@schema:geometry_location", "v:Point")
            .triple("v:Point", "@schema:coordinates", "v:Coordinates")
            .triple("v:Point", "@schema:coordinates", "v:AssetCoordinatesX")
            .triple("v:Point", "@schema:coordinates", "v:AssetCoordinatesY")
            .triple("v:AssetCoordinatesX", "sys:value", "v:AssetX")
            .triple("v:AssetCoordinatesX", "sys:index", "v:X_AssetX")
            .eq("v:X_AssetX", 0)
            .triple("v:AssetCoordinatesY", "sys:value", "v:AssetY")
            .triple("v:AssetCoordinatesY", "sys:index",  WOQL.literal(1, "xsd:nonNegativeInteger"))
    }
    else if (!asset && eventQuery) { // filter by event alone
        return eventQuery.triple("v:Asset", "rdf:type","@schema:Asset")
            .triple("v:Asset", "@schema:name", "v:Name")
            .opt(WOQL.triple("v:Asset", "@schema:description", "v:Description"))
            .opt(WOQL.triple("v:Asset", "@schema:assetType", "v:AssetType"))
            .triple("v:Asset", "@schema:location", "v:Location")
            .triple("v:Location", "@schema:geometry_location", "v:Point")
            .triple("v:Point", "@schema:coordinates", "v:AssetCoordinatesX")
            .triple("v:Point", "@schema:coordinates", "v:AssetCoordinatesY")
            .triple("v:AssetCoordinatesX", "sys:value", "v:AssetX")
            .triple("v:AssetCoordinatesX", "sys:index", "v:X_AssetX")
            .eq("v:X_AssetX", 0)
            .triple("v:AssetCoordinatesY", "sys:value", "v:AssetY")
            .triple("v:AssetCoordinatesY", "sys:index",  WOQL.literal(1, "xsd:nonNegativeInteger"))
    }
    return null
}

// get min and max of hazrad events
export const getEventScaleQuery = (event) => {
    if(!event) return null
    let WOQL= TerminusDBClient.WOQL
    if(event) {
        let eventName = encodeURI(event.trim())
        let hazard = `@schema:Hazard/${eventName}`
        return WOQL.triple("v:Scale", "rdf:type", "@schema:HazardScale")
            .triple("v:Scale", "@schema:hazard", hazard)
            .triple("v:Scale", "@schema:max", "v:Max")
		    .triple("v:Scale", "@schema:min", "v:Min")
    }
}





/*
let eventName="Drought", clickedGrade = 5
let hazard = `@schema:Hazard/${eventName}`
       triple("v:Asset", "@schema:applicable_hazards", "v:AssetHazard")
		.triple("v:AssetHazard", "@schema:hazard", hazard)
		.triple("v:AssetHazard", "@schema:Grade", "v:Grade")
		.less ("v:Grade", clickedGrade) */



/*let eventName="Drought", clickedGrade = 4
let hazard = `@schema:Hazard/${eventName}`
       triple("v:Asset", "@schema:applicable_hazards", "v:AssetHazard")
		.triple("v:AssetHazard", "@schema:hazard", hazard)
		.triple("v:Scale", "rdf:type", "@schema:HazardScale")//.triple("v:Scale", "v:A", "v:B")
         .triple("v:Scale", "@schema:hazard", hazard)
		.triple("v:Scale", "@schema:max", "v:Max")
		.triple("v:Scale", "@schema:min", "v:Min")
           //.triple("v:Hazard", "@schema:hazard", hazard)
			//.triple("v:Hazard", "@schema:Grade", "v:Grades") */


export const getAssetFailureChain = (asset) => {
    let WOQL=TerminusDBClient.WOQL
    let documentID=asset

    //let documentID = "Asset/Castle%20bruce%20Electrical%20substation%20"
    return WOQL.and(
        WOQL.path(documentID, "(<depends_on,dependent>)*", "v:Asset"),
        WOQL.triple("v:Inter", "@schema:depends_on", "v:Asset"),
        WOQL.triple("v:Inter", "@schema:dependent", "v:LinkedAsset"),
    )
    .triple("v:LinkedAsset", "@schema:name", "v:LinkedAssetName")
    .opt(WOQL.triple("v:LinkedAsset", "@schema:description", "v:LinkedAssetDescription"))
    .opt(WOQL.triple("v:LinkedAsset", "@schema:assetType", "v:LinkedAssetType"))
    .triple("v:LinkedAsset", "@schema:location", "v:LinkedAssetLocation")
    .triple("v:LinkedAssetLocation", "@schema:geometry_location", "v:LinkedAssetPoint")
    .triple("v:LinkedAssetPoint", "@schema:coordinates", "v:LinkedAssetCoordinatesX")
    .triple("v:LinkedAssetPoint", "@schema:coordinates", "v:LinkedAssetCoordinatesY")
    .triple("v:LinkedAssetCoordinatesX", "sys:value", "v:LinkedAssetX")
    .triple("v:LinkedAssetCoordinatesX", "sys:index", "v:X_LinkedAssetX")
    .eq("v:X_LinkedAssetX", 0)
    .triple("v:LinkedAssetCoordinatesY", "sys:value", "v:LinkedAssetY")
    .triple("v:LinkedAssetCoordinatesY", "sys:index",  WOQL.literal(1, "xsd:nonNegativeInteger"))


    .triple("v:Asset", "@schema:location", "v:AssetLocation")
    .triple("v:AssetLocation", "@schema:geometry_location", "v:AssetPoint")
    .triple("v:AssetPoint", "@schema:coordinates", "v:AssetCoordinatesX")
    .triple("v:AssetPoint", "@schema:coordinates", "v:AssetCoordinatesY")
    .triple("v:AssetCoordinatesX", "sys:value", "v:AssetX")
    .triple("v:AssetCoordinatesX", "sys:index", "v:X_AssetX")
    .eq("v:X_AssetX", 0)
    .triple("v:AssetCoordinatesY", "sys:value", "v:AssetY")
    .triple("v:AssetCoordinatesY", "sys:index",  WOQL.literal(1, "xsd:nonNegativeInteger"))

}



// query to get assets filtered by hazard events - ARRAY OF EVENTS
/*export const getAssetsByEventsOrIDQuery = (events, asset) => {
    let WOQL= TerminusDBClient.WOQL
    let qHazards = [], documentID=false, eventQuery
    if(asset) documentID=asset

    if(Array.isArray(events) && events.length) {
        events.map(event => {
            //let eventName = encodeURI(event.value.trim())
            let hazard = `@schema:Hazard/${event.value}`

            let q = WOQL.triple("v:Asset", "@schema:applicable_hazards", "v:Hazard")
                .triple("v:Hazard", "@schema:hazard", hazard)
                //.triple("v:Hazard", "@schema:Grade", 2)
            //let q = WOQL.triple("v:Asset", "@schema:applicable_hazards", hazard)
            qHazards.push(q)
        })

        eventQuery=WOQL.and(
            WOQL.distinct ("v:Asset",
                WOQL.or(...qHazards)
            )
        )
    }



    // filter by both ID and Event
    if(asset && Array.isArray(events) && events.length) {
        return eventQuery.triple("v:Asset", "rdf:type","@schema:Asset").eq("v:Asset", documentID)
            .triple("v:Asset", "rdf:type","@schema:Asset")
            .triple("v:Asset", "@schema:name", "v:Name")
            .triple("v:Asset", "@schema:description", "v:Description")
            .triple("v:Asset", "@schema:location", "v:Location")
            .triple("v:Location", "@schema:geometry_location", "v:Point")
            .triple("v:Point", "@schema:coordinates", "v:Coordinates")
            .triple("v:Coordinates", "sys:value", "v:Value")
            .triple("v:Coordinates", "sys:index", "v:Index")
    }
    else if (asset && !Array.isArray(events) && !events.length) { // filter by ID alone
        return WOQL.triple("v:Asset", "rdf:type","@schema:Asset").eq("v:Asset", documentID)
            .triple("v:Asset", "rdf:type","@schema:Asset")
            .triple("v:Asset", "@schema:name", "v:Name")
            .triple("v:Asset", "@schema:description", "v:Description")
            .triple("v:Asset", "@schema:location", "v:Location")
            .triple("v:Location", "@schema:geometry_location", "v:Point")
            .triple("v:Point", "@schema:coordinates", "v:Coordinates")
            .triple("v:Coordinates", "sys:value", "v:Value")
            .triple("v:Coordinates", "sys:index", "v:Index")
    }
    else if (!asset && Array.isArray(events) && events.length) { // filter by events alone
        return eventQuery.triple("v:Asset", "rdf:type","@schema:Asset")
            .triple("v:Asset", "@schema:name", "v:Name")
            .triple("v:Asset", "@schema:description", "v:Description")
            .triple("v:Asset", "@schema:location", "v:Location")
            .triple("v:Location", "@schema:geometry_location", "v:Point")
            .triple("v:Point", "@schema:coordinates", "v:Coordinates")
            .triple("v:Coordinates", "sys:value", "v:Value")
            .triple("v:Coordinates", "sys:index", "v:Index")
    }
    return null
} */

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

//correct query
/*let doc = "Asset/Castle%20bruce%20Electrical%20substation%20"
and(path(doc, "(<depends_on,dependent>)*", "v:X"),
    triple("v:Inter", "@schema:depends_on", "v:X"),
    triple("v:Inter", "@schema:dependent", "v:Y"))*/

// query which we used before for depends
/*return WOQL.and (
    WOQL.path(documentID, "(<depends_on,dependent>)*", "v:Asset")
        .triple("v:Relation", "@schema:depends_on", "v:Asset")
        .triple("v:Relation", "@schema:dependent", "v:LinkedAsset")
        .triple("v:Relation", "@schema:critical", "v:Critical")
)

.triple("v:LinkedAsset", "@schema:name", "v:Name")
.opt(WOQL.triple("v:Asset", "@schema:description", "v:Description"))
.triple("v:LinkedAsset", "@schema:location", "v:Location")
.triple("v:Location", "@schema:geometry_location", "v:Point")
.triple("v:Point", "@schema:coordinates", "v:Coordinates")
.triple("v:Coordinates", "sys:value", "v:Value")
.triple("v:Coordinates", "sys:index", "v:Index")     */





/* // gavins corect version
let documentID = "Asset/Castle%20bruce%20Electrical%20substation%20"
WOQL.and(
    WOQL.path(documentID, "(<depends_on,dependent>)*", "v:Asset"),
    WOQL.triple("v:Inter", "@schema:depends_on", "v:Asset"),
    WOQL.triple("v:Inter", "@schema:dependent", "v:LinkedAsset"),
)
.triple("v:LinkedAsset", "@schema:location", "v:LinkedAssetLocation")
.triple("v:LinkedAssetLocation", "@schema:geometry_location", "v:LinkedAssetPoint")
.triple("v:LinkedAssetPoint", "@schema:coordinates", "v:LinkedAssetCoordinatesX")
.triple("v:LinkedAssetPoint", "@schema:coordinates", "v:LinkedAssetCoordinatesY")
.triple("v:LinkedAssetCoordinatesX", "sys:value", "v:LinkedAssetX")
.triple("v:LinkedAssetCoordinatesX", "sys:index", "v:X_LinkedAssetX")
.eq("v:X_LinkedAssetX", 0)
.triple("v:LinkedAssetCoordinatesY", "sys:value", "v:LinkedAssetY")
.triple("v:LinkedAssetCoordinatesY", "sys:index",  literal(1, "xsd:nonNegativeInteger"))


.triple("v:Asset", "@schema:location", "v:AssetLocation")
.triple("v:AssetLocation", "@schema:geometry_location", "v:AssetPoint")
.triple("v:AssetPoint", "@schema:coordinates", "v:AssetCoordinatesX")
.triple("v:AssetPoint", "@schema:coordinates", "v:AssetCoordinatesY")
.triple("v:AssetCoordinatesX", "sys:value", "v:AssetX")
.triple("v:AssetCoordinatesX", "sys:index", "v:X_AssetX")
.eq("v:X_AssetX", 0)
.triple("v:AssetCoordinatesY", "sys:value", "v:AssetY")
.triple("v:AssetCoordinatesY", "sys:index",  literal(1, "xsd:nonNegativeInteger")) */






