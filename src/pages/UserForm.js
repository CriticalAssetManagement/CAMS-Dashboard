import React from "react"
import {Layout} from "../components/Layout"
import {Container} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {Form} from "../components/Form"
import {USER_TYPE, CREATE_MODE} from "./constants"
import {addDocument} from "../actions/DocumentControl"
import {Alerts} from "../components/Alerts"

export const UserForm = () => {
    const {
		connectionError,
        frames,
        successMsg,
        setSuccessMsg,
        errorMsg,
        setErrorMsg,
        woqlClient
	} = WOQLClientObj()

    function handleSubmit(data) {
        if(!data.hasOwnProperty("@type")) data["@type"] = USER_TYPE
        addDocument(woqlClient, data, setSuccessMsg, setErrorMsg)
    }

    return <Container fluid="lg" className="mt-5 mb-5">
        <Layout/>
        <Alerts errorMsg={connectionError}/>
        {frames &&
            <Form frames={frames}
                type={USER_TYPE}
                mode={CREATE_MODE}
                onSubmit={handleSubmit}
                />
        }
        <Alerts successMsg={successMsg}/>
        <Alerts errorMsg={errorMsg}/>
    </Container>
}