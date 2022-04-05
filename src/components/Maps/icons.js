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
import {VAR_GRADE} from "../constants"
import {
    ENERGY_ICON,
    ENERGY,
    COMMUNICATIONS,
    COMMUNICATIONS_ICON,
    AIRPORT,
    AIRPORT_ICON,
    ELECTRICAL_POWER_GENERATING_PLANTS,
    ELECTRICAL_POWER_GENERATING_PLANTS_ICON,
    SAFETY_AND_SECURITY,
    SAFETY_AND_SECURITY_ICON,
    FOOD_WATER_SHELTER,
    FOOD_WATER_SHELTER_ICON,
    HEALTH_AND_MEDICAL,
    HEALTH_AND_MEDICAL_ICON,
    TRANSPORTATION,
    TRANSPORTATION_ICON,
    OTHERS_ICON
} from "./markerTypes"

function getEnumTypeFromFrames(type) {
    return "@schema:AssetEnum/"+encodeURI(type.trim())
}


// function returns marker icons
export function getAssetTypeIcons(asset, key) {

    let options = {}

    if(asset[key] === getEnumTypeFromFrames(ENERGY)) {
        options = {
            icon: ENERGY_ICON
        }
    }
    else if(asset[key] === getEnumTypeFromFrames(TRANSPORTATION)) {
        options = {
            icon: TRANSPORTATION_ICON
        }
    }
    else if(asset[key] === getEnumTypeFromFrames(HEALTH_AND_MEDICAL)) {
        options = {
            icon: HEALTH_AND_MEDICAL_ICON
        }
    }
    else if(asset[key] === getEnumTypeFromFrames(FOOD_WATER_SHELTER)) {
        options = {
            icon: FOOD_WATER_SHELTER_ICON
        }
    }
    else if(asset[key] === getEnumTypeFromFrames(SAFETY_AND_SECURITY)) {
        options = {
            icon: SAFETY_AND_SECURITY_ICON
        }
    }
    else if(asset[key] === getEnumTypeFromFrames(ELECTRICAL_POWER_GENERATING_PLANTS)) {
        options = {
            icon: ELECTRICAL_POWER_GENERATING_PLANTS_ICON
        }
    }
    else if(asset[key] === getEnumTypeFromFrames(COMMUNICATIONS)) {
        options = {
            icon: COMMUNICATIONS_ICON
        }
    }
    else if(asset[key] === getEnumTypeFromFrames(AIRPORT)) {
        options = {
            icon: AIRPORT_ICON
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

