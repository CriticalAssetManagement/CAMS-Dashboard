
//variant
export const VARIANT="dark"
export const SECONDARY_VARIANT="secondary"
export const SUCCESS_VARIANT="success"

//Menus
export const BRAND_TITLE="Critical Asset Management System"
export const HOME="HOME"
export const USER_FORM="PEOPLE"
export const OWNER_FORM="OWNER"
export const AREA_FORM="AREAS"
export const ASSET_FORM="ASSETS"
export const REPORTS="REPORTS"
export const ASSETS_LINK = "LINKS"

//query variables
export const VAR_DEPENDENT="Dependent"
export const VAR_DEPENDENT_ON="DependentOn"
export const VAR_LONGITUDE="Longitude"
export const VAR_LATITUDE="Latitude"
export const VAR_NAME="Name"
export const VAR_CRITICAL="Critical"
export const VAR_GRADE="Grade"
export const VAR_INDEX="Index"
export const VAR_ASSET="Asset"
export const VAR_LINKED_ASSET="LinkedAsset"
export const VAR_VALUE="Value"
export const VAR_PATH="Path"
export const VAR_ASSET_IDENTIFIER="AssetIdentifier"
export const VAR_DESIGN_STANDARDS="DesignStandards"
export const VAR_LAST_MAINTAINED="LastMaintained"
export const VAR_DESCRIPTION="Description"
export const VAR_MAX="Max"

export const CRITICAL_COLOR="#bf0a30"//"#dc3545"
export const NON_CRITICAL_COLOR="#198754"

//react leaflet variables
export const LAT="lat"
export const LNG="lng"

// map types
export const POINTS="Points"
export const POLYLINE="Polyline"


// alert variant colors
export const ALERT_DANGER = "danger"
export const ALERT_SUCCESS = "success"


// map tool bar
export const CRITICAL_LINKS="Critical Links"
export const NON_CRITICAL_LINKS="Non Critical Links"
export const CRITICAL_LINKS_TITLE="Show Only Ciritcal Links"
export const SEARCH_ASSET_PLACEHOLDER= "Input an Asset to search"
export const SEARCH_ASSET_Label= "Filter by Asset ID"
export const SHOW_ASSET_DETAIL="View Details"
export const SHOW_ALL_ASSETS="Clear Filters"
export const SHOW_ALL_ASSETS_TITLE="Clear filters and Show All Available Assets"
export const SHOW_ALL_FAILURE_CHAIN_TITLE="Show failure chain"

// details constants for Asset details
export const ASSET_IDENTIFIER="asset_identifier"
export const COMMISIONING_DATE="commisioning_date"
export const DESIGN_STANDARDS="design_standards"
export const LAST_MAINTAINED="last_maintained"
export const LAST_MODIFIED="last_modified"

// empty placeholders
export const EMPTY_PLACEHOLDER="No documents to display ..."
export const EMPTY_DESCRIPTION="No description provided ..."
export const NO_OWNER_INFO="No contact details available ..."
export const NO_DATA_AVAILABLE= "No Asset links to display ..."

// Accordian titles
export const OWNER_ACCORDIAN_TITLE = "Contact Info"
export const ASSET_DEPENDENCY_ACCORDIAN_TITLE = "Links Info"
export const HIDE_OFFCANVAS_TITLE="Click to go back"

// Dropdown
export const HAZARD_DROPDOWN_TITLE="Filter by Events"
export const FAILURE_CHAIN_TITLE="Failure Chain"

//types
export const HAZARD_TYPE = "Hazard"

// select style
export const SELECT_STYLES = {
    control: (styles) => ({
        ...styles,
        backgroundColor: '#fff',
        borderColor: "#ced4da !important",
        width: '100%'
    }),
    menu: (styles) => ({
        ...styles,
        backgroundColor: '#fff',
        zIndex: "999 !important"
    }),
    menuPortal: base => ({ ...base, zIndex: 999 }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isDisabled
                ? undefined
                : isSelected
                ? "#fff"
                : isFocused
                ? "#fff"
                : undefined,
            color: isDisabled
                ? '#000'
                : isSelected,
            cursor: isDisabled ? 'not-allowed' : 'default',
                ':active': {
                    ...styles[':active'],
                backgroundColor: !isDisabled
                    ? isSelected
                    ? "#000"
                    : "#000"
                    : undefined,
                color: "#000",
                "&:hover": {
                    backgroundColor:"#f4f4f4"
                },
            },
        }
    },
    input: (styles) => {
        return {
            ...styles,
            color: '#000'
        }
    },
    singleValue:(styles) => {
        return {
            ...styles,
            color: '#000'
        }
    }
}

// ui frames for changing styles for react-select in terminusdb-documents-ui
export const UI_FRAMES={
    select_styles: SELECT_STYLES,
    subDocument_styles: "subDocumentCard"
}