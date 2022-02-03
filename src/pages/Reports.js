import React from "react"
import {Layout} from "../components/Layout"
import {Container} from "react-bootstrap"
import {REPORTS} from "../components/constants"

export const Reports = () => {
    return <Container fluid="lg" className="mt-5 mb-5">
        <Layout/>
        {REPORTS}
    </Container>
}