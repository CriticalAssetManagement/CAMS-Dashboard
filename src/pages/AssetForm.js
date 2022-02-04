import React, {useState} from "react"
import {Layout} from "../components/Layout"
import {Container} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {Form} from "../components/Form"
import {ASSET_TYPE, CREATE_MODE} from "./constants"
import {Alerts} from "../components/Alerts"
import {DocumentHook} from "../hooks/DocumentHook"
import {handleDocumentSelect} from "../components/utils"

export const AssetForm = () => {
    const {
		connectionError,
        frames,
        successMsg,
        setSuccessMsg,
        errorMsg,
        setErrorMsg,
        woqlClient,
        clearMessages
	} = WOQLClientObj()

    // extracted data from form
    const [extracted, setExtracted] = useState(false)
    let result=DocumentHook(woqlClient, extracted, setSuccessMsg, setErrorMsg)

    function handleSubmit(data) {
        if(!data.hasOwnProperty("@type")) data["@type"] = ASSET_TYPE
        clearMessages()
        setExtracted(data)
    }

    function handleSelect(inp, type) {
        if(!inp) return
        return handleDocumentSelect(woqlClient, inp, type)
    }


    return <Container fluid="lg" className="mt-5 mb-5">
        <Layout/>
        <Alerts errorMsg={connectionError}/>
        {frames &&
            <Form frames={frames}
                type={ASSET_TYPE}
                mode={CREATE_MODE}
                onSubmit={handleSubmit}
                onSelect={handleSelect}
            />
        }
        <Alerts successMsg={successMsg}/>
        <Alerts errorMsg={errorMsg}/>
    </Container>
}