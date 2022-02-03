import React from "react"
import {ALERT_DANGER} from "../components/constants"
import {Layout} from "../components/Layout"
import {Container, Alert} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {Form} from "../components/Form"
import {USER_TYPE, CREATE_MODE} from "./constants"

export const UserForm = () => {
    const {
		connectionError,
        frames
	} = WOQLClientObj()

    function handleSubmit(data) {
        console.log("Data Submitted:", data)
    }

    return <Container fluid="lg" className="mt-5 mb-5">
        <Layout/>
        {connectionError &&
			<Alert variant={ALERT_DANGER}>
				{connectionError}
			</Alert>
		}
        {frames &&
            <Form frames={frames}
                type={USER_TYPE}
                mode={CREATE_MODE}
                onSubmit={handleSubmit}/>
        }
    </Container>
}