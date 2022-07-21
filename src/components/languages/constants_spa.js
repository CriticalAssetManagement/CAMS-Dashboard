// constants in spanish 


//user form Tab
export const CREATE_USER_TAB = "Cargar usuario"
export const VIEW_USER_LIST = "Lista de usuarios"
export const VIEW_CLICKED_USER = "Ver usuario"
export const EDIT_CLICKED_USER = "editar usuario"

//owner form Tab
export const CREATE_OWNER_TAB = "Propietario de la carga"
export const VIEW_OWNER_LIST = "Lista de propietarios"
export const VIEW_CLICKED_OWNER = "Ver propietario"
export const EDIT_CLICKED_OWNER = "Editar propietario"

//Asset form Tab
export const CREATE_ASSET_TAB = "Cargar activo"
export const VIEW_ASSET_LIST = "Lista de activos"
export const VIEW_CLICKED_ASSET = "Ver activo"
export const EDIT_CLICKED_ASSET = "Editar activo"

//Links form Tab
export const CREATE_LINK_TAB = "Enlace de carga"
export const VIEW_LINK_LIST = "Lista de enlaces"
export const VIEW_CLICKED_LINK = "Ver enlace"
export const EDIT_CLICKED_LINK = "Editar enlace"

//Menus
export const BRAND_TITLE="Sistema de gestión de activos críticos"
export const HOME="HOGAR"
export const USER_FORM="GENTE"
export const OWNER_FORM="DUEÑO"
export const AREA_FORM="AREAS"
export const ASSET_FORM="ACTIVOS"
export const REPORTS="INFORMES"
export const ASSETS_LINK = "ENLACES"
export const USER_MANAGEMENT = "Gestión de usuarios"
export const PROFILE = "Perfil"
export const LOGOUT="Cerrar sesión"

// color constants
export const CRITICAL_COLOR="#bf0a30"//"#dc3545"
export const NON_CRITICAL_COLOR="#198754"
export const UPWARD_LINKS_COLOR="#000"

// tool bar constants 
export const EDIT = "Editar"
export const DELETE = "Borrar"

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
export const CRITICAL_LINK_TITLE="Enlaces críticos"
export const NON_CRITICAL_LINK_TITLE="Enlaces no críticos"
export const CRITICAL_LINKS="Enlaces críticos aguas abajo"
export const NON_CRITICAL_LINKS="Enlaces no críticos descendentes"
export const FAILURE_CHAIN_LINKS="Cadena de falla descendente"
export const CRITICAL_LINKS_TITLE="Mostrar solo enlaces de ciritcal"
export const SEARCH_ASSET_PLACEHOLDER= "Ingrese un activo para buscar"
export const SEARCH_ASSET_Label= "Filtrar por ID de activo"
export const SHOW_ASSET_DETAIL="Ver detalles"
export const SHOW_ALL_ASSETS="Reiniciar"
export const SHOW_ALL_ASSETS_TITLE="Borrar filtros y mostrar todos los activos disponibles"
export const SHOW_ALL_FAILURE_CHAIN_TITLE="Mostrar cadena de errores"
export const SHOW_ALL_UPWARD_CHAIN_TITLE="Mostrar enlaces ascendentes"
export const MORE_INFO_TITLE="Lista de activos..."
export const UPWARD_TITLE="Enlaces críticos ascendentes"
export const UPWARD_FAILURE_CHAIN_TITLE="Cadena de falla ascendente"
export const EXPORT_OWNER_LIST="Exportar lista de contactos"
export const CLICKED_CONTACT_LIST_ASSET="Lista de contactos para "
export const EXPORT_CSV_DESCRIPTION= "Descargue CSV para obtener detalles de contacto de todos los activos vinculados"

// details constants for Asset details
export const ASSET_IDENTIFIER="asset_identifier"
export const COMMISIONING_DATE="commisioning_date"
export const DESIGN_STANDARDS="design_standards"
export const LAST_MAINTAINED="last_maintained"
export const LAST_MODIFIED="last_modified"

// empty placeholders
export const EMPTY_PLACEHOLDER="No hay documentos para mostrar ..."
export const EMPTY_DESCRIPTION="No se proporcionó descripción ..."
export const NO_OWNER_INFO="No hay datos de contacto disponibles ..."
export const NO_ASSETS_AVAILABLE_MAP="No hay activos disponibles para mostrar en el mapa, agregue un nuevo activo..."
export const NO_ASSETS_AVAILBLE="No hay activos disponibles para mostrar, agregue un nuevo activo"
export const NO_OWNER_AVAILBLE="Ningún propietario disponible para mostrar, agregue un nuevo propietario"
export const NO_PERSON_AVAILABLE="No hay ninguna persona disponible para mostrar, agregue una nueva persona"
export const NO_LINKS_AVAILABLE="No hay enlaces disponibles para mostrar, agregar nuevos enlaces"

// Accordian titles
export const OWNER_ACCORDIAN_TITLE = "Datos de contacto"
export const ASSET_DEPENDENCY_ACCORDIAN_TITLE = "Información de enlaces"
export const HIDE_OFFCANVAS_TITLE="Haga clic para volver"
export const VIEW_DEPENDENT_LIST_ACCORDIAN_TITLE= "Ver lista de dependientes"

// Dropdown
export const HAZARD_DROPDOWN_TITLE="Filtrar por Eventos"
export const FAILURE_CHAIN_TITLE="Río abajo"
export const UPWARD_CHAIN_TITLE="Río arriba"

//types
export const HAZARD_TYPE = "Hazard"

//user page title 
export const USER_MANAGER="Administrador de usuarios"

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

// Texts to write success and delete messages
export const SUCCESS_DELETE="Eliminado con éxito"
export const SUCCESS_CREATE="Añadido exitosamente"

// CSV Headers for List of assets 
const ASSET_CSV_HEADERS =  [
    "@id", "assetType", "asset_identifier", "commisioning_date", "design_standards", "last_maintained", 
    "last_modified", "name" 
]

const ASSET_CSV_HEADER_LABELS = [
    "Identificación", "Tipo de activo", "Identificador de activos", "Fecha de puesta en servicio", 
    "Design Standards", "Normas de diseño", "Última modificación", "Nombre" 
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
    "Identificación", "Persona de contacto", "Nombre"
]

export const OWNER_CSV_CONFIG = {
    headers: OWNER_CSV_HEADERS,
    labels: OWNER_CSV_HEADER_LABELS
}

// CSV Headers for List of person 
export const NAME_LABEL = "Nombre"
export const ASSET_IDENTIFIER_LABEL="Identificador de activos"
export const CRITICAL_LABEL= "Crítico"
export const ASSET_TYPE_LABEL="Tipo de activo"

const PERSON_CSV_HEADERS =  [
    "@id", "email_address", "first_name", "job_title", "last_name", "organization", "phone_number"
]

const PERSON_CSV_HEADER_LABELS =  [
    "Identificación", "Dirección de correo electrónico", "Primer nombre", "Título profesional", 
    "Apellido", "Organización", "Número de teléfono"
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
    "Identificación", "Comentario", "Crítico", "Dependiente", "Depende de"
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
    "Activo", "Dependencias", "Nombre", "Identificador de activos"
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
    "Activo", "Identificador de activos", "Tipo de activo", "Crítico", "Normas de diseño", 
    "Último mantenimiento", "Nombre", "Latitud", "Longitud"
]

export const DEPENDENT_LIST_CSV_CONFIG = {
    headers: DEPENDENT_LIST_CSV_HEADERS,
    labels: DEPENDENT_LIST_CSV__HEADER_LABELS
}

// Asset Types
export const GOVERNMENT_BUILDINGS="Edificios gubernamentales"
export const MARINE_PORTS="Puertos Marítimos"
export const AIRPORT="Aeropuerto"
export const ELECTRICAL_POWER_GENERATING_PLANTS="Plantas Generadoras de Energía Eléctrica"
export const WATER_SYSTEM="Sistema de agua"
export const DESALINIZATION_PLANT="Planta de desalinización"
export const DESALINATION_PLANT="Desaladora"
export const WATER_DISTRIBUTION_SYSTEM="Sistema de distribución de agua"
export const SAFETY_AND_SECURITY="Seguridad y protección"
export const FOOD_WATER_SHELTER="Comida, Agua, Refugio"
export const HEALTH_AND_MEDICAL="Salud y Medicina"
export const ENERGY="Energía"
export const COMMUNICATIONS="Comunicaciones"
export const TRANSPORTATION="Transporte"
export const HAZARDOUS_MATERIAL="Material peligroso"
export const OTHERS="Otros"

