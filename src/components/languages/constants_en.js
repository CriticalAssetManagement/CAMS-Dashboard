
// constant file in english 


//user form Tab
export const CREATE_USER_TAB = "Load User"
export const VIEW_USER_LIST = "User List"
export const VIEW_CLICKED_USER = "View User"
export const EDIT_CLICKED_USER = "Edit User"

//owner form Tab
export const CREATE_OWNER_TAB = "Load Owner"
export const VIEW_OWNER_LIST = "Owner List"
export const VIEW_CLICKED_OWNER = "View Owner"
export const EDIT_CLICKED_OWNER = "Edit Owner"

//Area form Tab
export const CREATE_AREA_TAB = "Load Area"
export const VIEW_AREA_LIST = "Area List"
export const VIEW_CLICKED_AREA = "View Area"
export const EDIT_CLICKED_AREA = "Edit Area"

//Asset form Tab
export const CREATE_ASSET_TAB = "Load Asset"
export const VIEW_ASSET_LIST = "Asset List"
export const VIEW_CLICKED_ASSET = "View Asset"
export const EDIT_CLICKED_ASSET = "Edit Asset"

//Links form Tab
export const CREATE_LINK_TAB = "Load Link"
export const VIEW_LINK_LIST = "Links List"
export const VIEW_CLICKED_LINK = "View Link"
export const EDIT_CLICKED_LINK = "Edit Link"

//Menus
export const BRAND_TITLE="Critical Asset Management System"
export const HOME="HOME"
export const USER_FORM="PEOPLE"
export const OWNER_FORM="OWNER"
export const AREA_FORM="AREAS"
export const ASSET_FORM="ASSETS"
export const REPORTS="REPORTS"
export const ASSETS_LINK = "LINKS"
export const USER_MANAGEMENT = "User Management"
export const PROFILE = "Profile"
export const LOGOUT="Logout"

// tool bar constants 
export const EDIT = "Edit"
export const DELETE = "Delete"

// color constants
export const CRITICAL_COLOR="#bf0a30"//"#dc3545"
export const NON_CRITICAL_COLOR="#198754"
export const UPWARD_LINKS_COLOR="#000"

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
export const CRITICAL_LINK_TITLE="Critical Links"
export const NON_CRITICAL_LINK_TITLE="Non Critical Links"
export const CRITICAL_LINKS="Downstream Critical Links"
export const NON_CRITICAL_LINKS="Downstream Non Critical Links"
export const FAILURE_CHAIN_LINKS="Downstream Failure Chain"
export const CRITICAL_LINKS_TITLE="Show Only Ciritcal Links"
export const SEARCH_ASSET_PLACEHOLDER= "Input an Asset to search"
export const SEARCH_ASSET_Label= "Filter by Asset ID"
export const SHOW_ASSET_DETAIL="View Details"
export const SHOW_ALL_ASSETS="Reset"
export const SHOW_ALL_ASSETS_TITLE="Clear filters and Show All Available Assets"
export const SHOW_ALL_FAILURE_CHAIN_TITLE="Show failure chain"
export const SHOW_ALL_UPWARD_CHAIN_TITLE="Show Upstream Links"
export const MORE_INFO_TITLE="Assets List ..."
export const UPWARD_TITLE="Upstream Critical Links"
export const UPWARD_FAILURE_CHAIN_TITLE="Upstream Failure Chain"
export const EXPORT_OWNER_LIST="Export Contact List"
export const CLICKED_CONTACT_LIST_ASSET="Contact List for "
export const EXPORT_CSV_DESCRIPTION= "Download CSV to get Contact Details of all linked Assets"

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
export const NO_ASSETS_AVAILABLE_MAP="No Assets available to display on Map, Please add a new Asset ..."
export const NO_ASSETS_AVAILBLE="No Assets available to display, Add a new Asset"
export const NO_OWNER_AVAILBLE="No Owner available to display, Add a new Owner"
export const NO_PERSON_AVAILABLE="No Person available to display, Add a new Person"
export const NO_LINKS_AVAILABLE="No Links available to display, Add new Links"

// Accordian titles
export const OWNER_ACCORDIAN_TITLE = "Contact Info"
export const ASSET_DEPENDENCY_ACCORDIAN_TITLE = "Links Info"
export const HIDE_OFFCANVAS_TITLE="Click to go back"
export const VIEW_DEPENDENT_LIST_ACCORDIAN_TITLE= "View Dependents List"

// Dropdown
export const HAZARD_DROPDOWN_TITLE="Filter by Events"
export const FAILURE_CHAIN_TITLE="Downstream"
export const UPWARD_CHAIN_TITLE="Upstream"

//types
export const HAZARD_TYPE = "Hazard"

//user page title 
export const USER_MANAGER="User Manager"

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
            color: '#000',
            width: "500px"
        }
    },
    mode: "light"
}

// ui frames for changing styles for react-select in terminusdb-documents-ui
export const UI_FRAMES={
    select_styles: SELECT_STYLES,
    subDocument_styles: "subDocumentCard"
}

// Texts to write success and error messages
export const SUCCESS_DELETE="Successfully deleted"
export const SUCCESS_CREATE="Successfully added"

// CSV Headers for List of assets 
export const NAME_LABEL = "Name"
export const ASSET_IDENTIFIER_LABEL="Asset Identifier"
export const CRITICAL_LABEL= "Critical"
export const ASSET_TYPE_LABEL="Asset Type"

const ASSET_CSV_HEADERS =  [
    "@id", "assetType", "asset_identifier", "commisioning_date", "design_standards", "last_maintained", 
    "last_modified", "name" 
]

const ASSET_CSV_HEADER_LABELS = [
    "Id", "Asset Type", "Asset Identifier", "Commisioning Date", "Design Standards", "Last Maintained", 
    "Last Modified", "Name" 
]

export const ASSET_CSV_CONFIG = {
    headers: ASSET_CSV_HEADERS,
    labels: ASSET_CSV_HEADER_LABELS
}

// CSV Headers for List of owners 
const OWNER_CSV_HEADERS =  [
    "@id", "contact_person", "name"
]

const OWNER_CSV_HEADER_LABELS =  [
    "Id", "Contact Person", "Name"
]

export const OWNER_CSV_CONFIG = {
    headers: OWNER_CSV_HEADERS,
    labels: OWNER_CSV_HEADER_LABELS
}

// CSV Headers for List of person 
const PERSON_CSV_HEADERS =  [
    "@id", "email_address", "first_name", "job_title", "last_name", "organization", "phone_number"
]

const PERSON_CSV_HEADER_LABELS =  [
    "Id", "Email Address", "First Name", "Job Title", "Last Name", "Organization", "Phone Number"
]

export const PERSON_CSV_CONFIG = {
    headers: PERSON_CSV_HEADERS,
    labels: PERSON_CSV_HEADER_LABELS
}

// CSV Headers for List of Links 
const LINK_CSV_HEADERS =  [
    "@id", "comment", "critical", "dependent", "depends_on"
]

const LINK_CSV_HEADER_LABELS =  [
    "Id", "Comment", "Critical", "Dependent", "Depends On"
]

export const LINK_CSV_CONFIG = {
    headers: LINK_CSV_HEADERS,
    labels: LINK_CSV_HEADER_LABELS
}

// CSV Headers for List of Reports 
const REPORT_CSV_HEADERS =  [
    "Asset", "Critical", "Name", "AssetIdentifier"
]

const REPORT_CSV_HEADER_LABELS =  [
    "Asset", "Dependencies", "Name", "Asset Identifier"
]

export const REPORT_CSV_CONFIG = {
    headers: REPORT_CSV_HEADERS,
    labels: REPORT_CSV_HEADER_LABELS
}

//CSV Headers for Critical List 
const DEPENDENT_LIST_CSV_HEADERS =  [
    "Asset", "AssetIdentifier", "AssetType", "Critical", "DesignStandards", "LastMaintained", "Name", "lat", "lng"
]

const DEPENDENT_LIST_CSV__HEADER_LABELS =  [
    "Asset", "Asset Identifier", "Asset Type", "Critical", "Design Standards", "Last Maintained", "Name", "Latitude", "Longitude"
]

export const DEPENDENT_LIST_CSV_CONFIG = {
    headers: DEPENDENT_LIST_CSV_HEADERS,
    labels: DEPENDENT_LIST_CSV__HEADER_LABELS
}

// Asset Types
export const GOVERNMENT_BUILDINGS="Government Buildings"
export const MARINE_PORTS="Marine Ports"
export const AIRPORT="Airport"
export const ELECTRICAL_POWER_GENERATING_PLANTS="Electrical Power Generating Plants"
export const WATER_SYSTEM="Water System"
export const DESALINIZATION_PLANT="Desalinization Plant"
export const DESALINATION_PLANT="Desalination Plant"
export const WATER_DISTRIBUTION_SYSTEM="Water Distribution System"
export const SAFETY_AND_SECURITY="Safety and Security"
export const FOOD_WATER_SHELTER="Food, Water, Shelter"
export const HEALTH_AND_MEDICAL="Health and Medical"
export const ENERGY="Energy"
export const COMMUNICATIONS="Communications"
export const TRANSPORTATION="Transportation"
export const HAZARDOUS_MATERIAL="Hazardous Material"
export const OTHERS="Others"