import React from "react"
import {HOME, USER_FORM, AREA_FORM, ASSET_FORM, ASSETS_LINK, REPORTS, BRAND_TITLE,USER_MANAGMENT} from "./constants"
import {USER_FORM_PAGE, HOME_PAGE, AREA_FORM_PAGE, ASSET_FORM_PAGE, REPORTS_PAGE, ASSETS_LINK_PAGE, USER_MANAGMENT_PAGE} from "../routing/constants"
import {Nav, Navbar, Container} from "react-bootstrap"
import { NavLink as RouterNavLink } from "react-router-dom"
import {WOQLClientObj} from '../init-woql-client'
import {GoHome} from "react-icons/go"
import {FiMap, FiMapPin, FiLink} from "react-icons/fi"
import {BiBookReader} from "react-icons/bi"
import {RiUserSmileLine} from "react-icons/ri"

const MenuIcon = ({icon, title}) => {
    return <div className="d-flex">
        <h3 className="text-success ml-2">{icon}</h3>
        <label role="button" className="m-2 text-muted fw-bold">{title}</label>
    </div>
}

const BrandIcon = () => {
    return <div className="bg-success p-2 rounded">
        <img
            //src="https://avatars.githubusercontent.com/u/93081083?s=200&v=4"
            src="https://climateresilient.world/wp-content/uploads/2022/03/cams-logo-simple-light.png"
            width="auto"
            height="auto"
            className="d-inline-block align-top"
            alt="CAMS"
        />
    </div>
}

export const Menu = () => {

    const {
		setPage
	} = WOQLClientObj()

    return <Navbar expand="lg" className={`p-3 navbar navbar-transparent bg-${"light"}`}>
        <Navbar.Brand href="https://climateresilient.world/"
            title="Visit GitHub repository for more info"
            target="_blank">
                <BrandIcon/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
            <Nav className="me-auto m-3">
                <Nav.Link
                    as={RouterNavLink}
                    title={HOME}
                    to={HOME_PAGE}
                    exact
                    id={HOME}
                    onClick={(e) => setPage(HOME_PAGE)}
                >
                    <MenuIcon icon={<GoHome/>} title={HOME}/>
                </Nav.Link>
                <Nav.Link
                    as={RouterNavLink}
                    title={USER_FORM}
                    to={USER_FORM_PAGE}
                    exact
                    id={USER_FORM}
                    onClick={(e) => setPage(USER_FORM_PAGE)}
                    >
                        <MenuIcon icon={<RiUserSmileLine/>} title={USER_FORM}/>
                </Nav.Link>
                <Nav.Link
                    as={RouterNavLink}
                    title={AREA_FORM}
                    to={AREA_FORM_PAGE}
                    exact
                    id={AREA_FORM}
                    onClick={(e) => setPage(AREA_FORM_PAGE)}
                    >
                        <MenuIcon icon={<FiMap/>} title={AREA_FORM}/>
                </Nav.Link>
                <Nav.Link
                    as={RouterNavLink}
                    title={ASSET_FORM}
                    to={ASSET_FORM_PAGE}
                    exact
                    id={ASSET_FORM}
                    onClick={(e) => setPage(ASSET_FORM_PAGE)}
                    >
                        <MenuIcon icon={<FiMapPin/>} title={ASSET_FORM}/>
                </Nav.Link>
                <Nav.Link
                    as={RouterNavLink}
                    title={ASSETS_LINK}
                    to={ASSETS_LINK_PAGE}
                    exact
                    id={ASSETS_LINK}
                    onClick={(e) => setPage(ASSETS_LINK_PAGE)}
                    >
                            <MenuIcon icon={<FiLink/>} title={ASSETS_LINK}/>
                </Nav.Link>
                <Nav.Link
                    as={RouterNavLink}
                    title={REPORTS}
                    to={REPORTS_PAGE}
                    exact
                    id={REPORTS}
                    onClick={(e) => setPage(REPORTS_PAGE)}
                    >
                            <MenuIcon icon={<BiBookReader/>} title={REPORTS}/>
                </Nav.Link>
                <Nav.Link
                    as={RouterNavLink}
                    title={USER_MANAGMENT}
                    to={USER_MANAGMENT_PAGE}
                    exact
                    id={USER_MANAGMENT}
                    onClick={(e) => setPage(USER_MANAGMENT_PAGE)}
                    >
                      <MenuIcon icon={<BiBookReader/>} title={USER_MANAGMENT}/>
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
  </Navbar>
}