import React from "react"
import {HOME, USER_FORM, AREA_FORM, ASSET_FORM, REPORTS, VARIANT} from "./constants"
import {USER_FORM_PAGE, HOME_PAGE, AREA_FORM_PAGE, ASSET_FORM_PAGE, REPORTS_PAGE} from "../routing/constants"
import {Nav, Navbar, Container} from "react-bootstrap"
import { NavLink as RouterNavLink } from "react-router-dom"
import {WOQLClientObj} from '../init-woql-client'

export const Menu = () => {

    const {
		setPage
	} = WOQLClientObj()

    return <Navbar className={`navbar navbar-expand-lg navbar-dark bg-${VARIANT} mt-5 mb-3`}>
        <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link
                        as={RouterNavLink}
                        title={HOME}
                        to={HOME_PAGE}
                        exact
                        id={HOME}
                        onClick={(e) => setPage(HOME_PAGE)}
                    >
                        {HOME}
                    </Nav.Link>
                    <Nav.Link
                        as={RouterNavLink}
                        title={USER_FORM}
                        to={USER_FORM_PAGE}
                        exact
                        id={USER_FORM}
                        onClick={(e) => setPage(USER_FORM_PAGE)}
                        >
                        {USER_FORM}
                    </Nav.Link>
                    <Nav.Link
                        as={RouterNavLink}
                        title={AREA_FORM}
                        to={AREA_FORM_PAGE}
                        exact
                        id={AREA_FORM}
                        onClick={(e) => setPage(AREA_FORM_PAGE)}
                        >
                        {AREA_FORM}
                    </Nav.Link>
                    <Nav.Link
                        as={RouterNavLink}
                        title={ASSET_FORM}
                        to={ASSET_FORM_PAGE}
                        exact
                        id={ASSET_FORM}
                        onClick={(e) => setPage(ASSET_FORM_PAGE)}
                        >
                        {ASSET_FORM}
                    </Nav.Link>
                    <Nav.Link
                        as={RouterNavLink}
                        title={REPORTS}
                        to={REPORTS_PAGE}
                        exact
                        id={REPORTS}
                        onClick={(e) => setPage(REPORTS_PAGE)}
                        >
                        {REPORTS}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
  </Navbar>
}