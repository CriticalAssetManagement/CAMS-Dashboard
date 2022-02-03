import React from "react"
import {Layout} from "../components/Layout"
import {Container} from "react-bootstrap"
import {HOME} from "../components/constants"

export const HomePage = () => {
    return <Container fluid="lg" className="mt-5 mb-5">
        <Layout/>
        {HOME}
    </Container>
}