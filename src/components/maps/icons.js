import {
    BG_CHILI_ICON,
    BG_RED_ICON,
    BG_BURGUNDY_ICON,
    BG_AMBER_ICON,
    BG_DIJON_ICON,
    BG_FIRE_ICON,
    BG_GOLD_ICON,
    BG_AMBER,
    BG_CHILI,
    BG_RED,
    BG_DIJON,
    BG_BURGUNDY
} from "./markers"
import {VAR_GRADE, VAR_ASSET_ENUM_SCHEMA_REF} from "../constants"
import {
    ENERGY_ICON,
    COMMUNICATIONS_ICON,
    AIRPORT_ICON,
    ELECTRICAL_POWER_GENERATING_PLANTS_ICON,
    SAFETY_AND_SECURITY_ICON,
    FOOD_WATER_SHELTER_ICON,
    HEALTH_AND_MEDICAL_ICON,
    TRANSPORTATION_ICON,
    OTHERS_ICON,
    GOVERNMENT_BUILDINGS_ICON,
    MARINE_PORTS_ICON
} from "./markerTypes"

function getEnumTypeFromFrames(type) {
    return VAR_ASSET_ENUM_SCHEMA_REF+encodeURI(type.trim())
}


// function returns marker icons
export function getAssetTypeIcons(asset, key, language) {

    let options = {}
 
    if(asset[key] === getEnumTypeFromFrames(language.ENERGY)) {
        options = {
            icon: ENERGY_ICON
        }
    }
    else if(asset[key] === getEnumTypeFromFrames(language.TRANSPORTATION)) {
        options = {
            icon: TRANSPORTATION_ICON
        }
    }
    else if(asset[key] === getEnumTypeFromFrames(language.HEALTH_AND_MEDICAL)) {
        options = {
            icon: HEALTH_AND_MEDICAL_ICON
        }
    }
    else if(asset[key] === getEnumTypeFromFrames(language.FOOD_WATER_SHELTER)) {
        options = {
            icon: FOOD_WATER_SHELTER_ICON
        }
    }
    else if(asset[key] === getEnumTypeFromFrames(language.SAFETY_AND_SECURITY)) {
        options = {
            icon: SAFETY_AND_SECURITY_ICON
        }
    }
    else if(asset[key] === getEnumTypeFromFrames(language.ELECTRICAL_POWER_GENERATING_PLANTS)) {
        options = {
            icon: ELECTRICAL_POWER_GENERATING_PLANTS_ICON
        }
    }
    else if(asset[key] === getEnumTypeFromFrames(language.COMMUNICATIONS)) {
        options = {
            icon: COMMUNICATIONS_ICON
        }
    }
    else if(asset[key] === getEnumTypeFromFrames(language.AIRPORT)) {
        options = {
            icon: AIRPORT_ICON
        }
    }
    else if(asset[key] === getEnumTypeFromFrames(language.GOVERNMENT_BUILDINGS)) {
        options = {
            icon: GOVERNMENT_BUILDINGS_ICON
        }
    }
    else if(asset[key] === getEnumTypeFromFrames(language.MARINE_PORTS)) {
        options = {
            icon: MARINE_PORTS_ICON
        }
    }
    else {
        options = {
            icon: OTHERS_ICON
        }
    }
    return options
}

//function returns grade color
export function getGradeIcons (asset) {
    if(asset[VAR_GRADE] === 1) {
        return BG_AMBER
    }
    else if(asset[VAR_GRADE] === 2) {
        return BG_DIJON
    }
    else if(asset[VAR_GRADE] === 3) {
        return BG_RED
    }
    else if(asset[VAR_GRADE] === 4) {
        return BG_CHILI
    }
    else if(asset[VAR_GRADE] === 5) {
        return BG_BURGUNDY
    }
}

/* //function returns grade colored marker icons
export function getGradeIcons (asset) {
    let options = {}
    if(asset[VAR_GRADE] === 1) {
        options = {
            icon: BG_AMBER_ICON
        }
    }
    else if(asset[VAR_GRADE] === 2) {
        options = {
            icon: BG_DIJON_ICON
        }
    }
    else if(asset[VAR_GRADE] === 3) {
        options = {
            icon: BG_RED_ICON
        }
    }
    else if(asset[VAR_GRADE] === 4) {
        options = {
            icon: BG_CHILI_ICON
        }
    }
    else if(asset[VAR_GRADE] === 5) {
        options = {
            icon: BG_BURGUNDY_ICON
        }
    }
    return options
}*/

