import React from "react"
import {Layout} from "../components/Layout"
import {Container} from "react-bootstrap"
import {ASSET_TYPE} from "./constants"
import {List} from "../components/List"

export const HomePage = () => {
    return <Container fluid="lg" className="mt-5 mb-5">
        <Layout/>
        <List type={ASSET_TYPE}/>
    </Container>
}