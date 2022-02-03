import React from "react"
import {Layout} from "../components/Layout"
import {Container} from "react-bootstrap"
import {ASSET_FORM} from "../components/constants"

export const AssetForm = () => {
    return <Container fluid="lg" className="mt-5 mb-5">
        <Layout/>
        {ASSET_FORM}
    </Container>
}