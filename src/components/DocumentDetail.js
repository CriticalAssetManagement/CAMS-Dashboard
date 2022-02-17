
import React, {useState} from "react"
import {Accordion} from 'react-bootstrap-accordion'
import {SHOW_ASSET_DETAIL, ASSET_IDENTIFIER, COMMISIONING_DATE, DESIGN_STANDARDS, LAST_MAINTAINED, LAST_MODIFIED} from "./constants"
import {WOQLClientObj} from '../init-woql-client'
import {ViewDocument} from "./Display"
import {GetDocumentHook} from "../hooks/DocumentHook"
import {ASSET_TYPE} from "../pages/constants"

export const DocumentDetail = ({filteredAssets}) => {
    const {
        frames,
        woqlClient,
        setSuccessMsg,
        setErrorMsg,
        loading,
        setLoading,
	} = WOQLClientObj()

    if(!Array.isArray(filteredAssets) && !filteredAssets[0].hasOwnProperty("id")) return <div/>

    //get a document
    let documentResults=GetDocumentHook(woqlClient, filteredAssets[0].id, setLoading, setSuccessMsg, setErrorMsg)

    /*@id: "Asset/Saint%20Joseph"
@type: "Asset"
asset_identifier: "Saint Joseph"
commisioning_date: "2011-01-01T01:00:37Z"
design_standards: "Saint Joseph"
last_maintained: "2011-01-01T01:00:37Z"
last_modified: "2011-01-01T01:00:37Z"
location: {@id: 'Asset/Saint%20Joseph/location/Location/28e63d246f4…feef6f9b5d3b8c9151e5590b84be6cc63e53352f2522d2911', @type: 'Location', city: 'Saint Joseph', geometry_location: {…}, state: 'Saint Joseph', …}
name: "Saint Joseph"
spatial_web_identifier:*/

const hidden = () => <div/>

    const uiConfig = {
        "@type": {"ui:widget": hidden},
        "location": {"ui:widget": hidden},
        "spatial_web_identifier": {"ui:widget": hidden},
        "owner": {"ui:widget": hidden}
    }



    function CustomFieldTemplate(props) {
        const {id, classNames, label, help, required, description, errors, children} = props

        var css = "d-none"
        if(props.schema.title === ASSET_IDENTIFIER ||
            props.schema.title === COMMISIONING_DATE ||
            props.schema.title === DESIGN_STANDARDS ||
            props.schema.title === LAST_MAINTAINED ||
            props.schema.title === LAST_MODIFIED)
                css = "d-block w-100 mb-3"
        if(props.id === "root") css="d-flex"

        return (
            <div className={css}>
                <label htmlFor={id}>{label}{required ? "*" : null}</label>
                {description}
                {children}
                {errors}
                {help}
            </div>
        )
    }

    return <React.Fragment>
        {documentResults && <Accordion title={SHOW_ASSET_DETAIL}>
            <ViewDocument
                frames={frames}
                type={ASSET_TYPE}
                FieldTemplate={CustomFieldTemplate}
                showDocument={documentResults}
            />
        </Accordion>
        }
    </React.Fragment>
}