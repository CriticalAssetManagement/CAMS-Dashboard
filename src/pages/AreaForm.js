import React from "react"
import {Layout} from "../components/Layout"
import {Container} from "react-bootstrap"
import {AREA_FORM} from "../components/constants"

export const AreaForm = () => {
    return <Container fluid="lg" className="mt-5 mb-5">
        <Layout/>
        {AREA_FORM}
    </Container>
}