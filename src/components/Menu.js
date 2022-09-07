import React from "react"
//import {HOME, USER_FORM, OWNER_FORM, AREA_FORM, ASSET_FORM, ASSETS_LINK, REPORTS, BRAND_TITLE,USER_MANAGEMENT} from "./constants"
import {USER_FORM_PAGE, OWNER_FORM_PAGE, HOME_PAGE, AREA_FORM_PAGE, ASSET_FORM_PAGE, REPORTS_PAGE, ASSETS_LINK_PAGE,USER_MANAGEMENT_PAGE} from "../routing/constants"
import {Nav, Navbar,Button,Dropdown} from "react-bootstrap"
//import { NavLink as RouterNavLink } from "react-router-dom"
import {NavLink as RouterNavLink, useResolvedPath,useMatch} from "react-router-dom" 
import {WOQLClientObj} from '../init-woql-client'
import {GoHome} from "react-icons/go"
import {FiMap, FiMapPin, FiLink} from "react-icons/fi"
import {BiBookReader} from "react-icons/bi"
import {GrUserAdmin} from "react-icons/gr"
import {AiOutlineUsergroupAdd,AiOutlineUser,AiOutlinePoweroff} from "react-icons/ai"
import {BsPerson, BsPersonBadge} from "react-icons/bs"
import {loginConf} from "../utils/auth0LoginConf"

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
            //src="https://climateresilient.world/wp-content/uploads/2022/03/cams-logo-simple-light.png"
            src="https://climateresilient.world/wp-content/uploads/2022/03/CAMS-Logo-Light-Simple-200px.png"
            width="auto"
            height="auto"
            className="d-inline-block align-top"
            alt="CAMS"
        />
    </div>
}

export const Menu = () => {

    const {
		setPage, 
        team, 
        accessControlDashboard,
        language,
        clientUser,
	} = WOQLClientObj()

    const {
        picture,
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = clientUser

    const connection_type = process.env.CONNECTION_TYPE;

    //console.log("user",user)
    const login = () =>{
        const loginConfObj = loginConf()
        loginWithRedirect(loginConfObj)
    }

    const logoutWithRedirect = () =>{   
        const config = { returnTo : `${window.location.origin}/${team}`}
        logout(config)
    }
    
    const isAdmin = accessControlDashboard && accessControlDashboard.isAdmin() ? true : false
     
    const toHomeTeam = HOME_PAGE.replace(":teamid",team) 
    let resolved = useResolvedPath(toHomeTeam);
    let match = useMatch({ path: resolved.pathname, end: true });

    function getActive (){
        return match ? 'nav-link active' : 'nav-link'
    }
  
    
    return <Navbar fixed="top" expand="lg" className={`px-3 navbar navbar-transparent bg-${"light"} nav-container`}>
        <Navbar.Brand href="https://climateresilient.world/"
            title="Visit GitHub repository for more info"
            target="_blank">
                <BrandIcon/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
            <Nav className="me-auto m-3">
            <RouterNavLink
                to={toHomeTeam} 
                className={getActive}
                id={language.HOME}
                onClick={(e) => setPage(HOME_PAGE)}>
                <MenuIcon icon={<GoHome/>} title={language.HOME}/>
            </RouterNavLink>  
             <Nav.Link
                    as={RouterNavLink}
                    title={language.USER_FORM}
                    to={USER_FORM_PAGE.replace(":teamid",team)}
                    exact
                    id={language.USER_FORM}
                    onClick={(e) => setPage(USER_FORM_PAGE)}
                    className="nav-link"
                    >
                    <MenuIcon icon={<BsPerson/>} title={language.USER_FORM}/>
                </Nav.Link>
                <Nav.Link
                    as={RouterNavLink}
                    title={language.OWNER_FORM}
                    to={OWNER_FORM_PAGE.replace(":teamid",team)}
                    exact
                    id={language.OWNER_FORM}
                    onClick={(e) => setPage(OWNER_FORM_PAGE)}
                    >
                    <MenuIcon icon={<BsPersonBadge/>} title={language.OWNER_FORM}/>
                </Nav.Link>
                {/*<Nav.Link // hide for now
                    as={RouterNavLink}
                    title={AREA_FORM}
                    to={AREA_FORM_PAGE}
                    exact
                    id={AREA_FORM}
                    onClick={(e) => setPage(AREA_FORM_PAGE)}
                    >
                        <MenuIcon icon={<FiMap/>} title={AREA_FORM}/>
                </Nav.Link> */}
                <Nav.Link
                    as={RouterNavLink}
                    title={language.ASSET_FORM}
                    to={ASSET_FORM_PAGE.replace(":teamid",team)}
                    exact
                    id={language.ASSET_FORM}
                    onClick={(e) => setPage(ASSET_FORM_PAGE)}
                    >
                    <MenuIcon icon={<FiMapPin/>} title={language.ASSET_FORM}/>
                </Nav.Link>
                <Nav.Link
                    as={RouterNavLink}
                    title={language.ASSETS_LINK}
                    to={ASSETS_LINK_PAGE.replace(":teamid",team)}
                    exact
                    id={language.ASSETS_LINK}
                    onClick={(e) => setPage(ASSETS_LINK_PAGE)}
                    >
                            <MenuIcon icon={<FiLink/>} title={language.ASSETS_LINK}/>
                </Nav.Link>
                <Nav.Link
                    as={RouterNavLink}
                    title={language.REPORTS}
                    to={REPORTS_PAGE.replace(":teamid",team)}
                    exact
                    id={language.REPORTS}
                    onClick={(e) => setPage(REPORTS_PAGE)}
                    >
                        <MenuIcon icon={<BiBookReader/>} title={language.REPORTS}/>
                    </Nav.Link>
            </Nav>
            {connection_type !== "LOCAL" &&
            <div className="d-flex">
                {!isAuthenticated && (
                    <Nav.Item>
                    <Button 
                        id="qsLoginBtn"
                        color="primary"
                        className="btn-margin"
                        onClick={() => login()}
                    >
                        Log in
                    </Button>
                    </Nav.Item>
                )}
                {isAuthenticated &&  <Dropdown className="mr-4" >
                    <Dropdown.Toggle nav caret id="profileDropDown">
                        <img
                        src={picture}
                        alt="Profile"
                        className="nav-user-profile rounded-circle"
                        width="50"
                        />
                    </Dropdown.Toggle>
                    <Dropdown.Menu drop="start">
                        <Dropdown.Item>
                            {/* <Nav.Link  as={RouterNavLink}
                                title={PROFILE}
                                to={PROFILE_PAGE}
                                exact
                                onClick={(e) => setPage(PROFILE)}
                                id={"Profile"}>
                                    <AiOutlineUser className="mr-3 mb-1" />Profile
                                </Nav.Link>*/}
                        </Dropdown.Item>
                        
                        {isAdmin && <React.Fragment><Dropdown.Item>
                            <Nav.Link  as={RouterNavLink}
                                title={language.USER_MANAGEMENT}
                                to={USER_MANAGEMENT_PAGE.replace(":teamid",team)}
                                exact
                                onClick={(e) => setPage(language.USER_MANAGEMENT)}
                                id={USER_MANAGEMENT_PAGE}>
                                    <GrUserAdmin  className="mr-3 mb-1" />{language.USER_MANAGER}
                            </Nav.Link>
                        </Dropdown.Item> 

                        <Dropdown.Divider /> </React.Fragment>}
                        <Dropdown.Item>
                            <Nav.Link
                                title={language.LOGOUT}
                                exact
                                onClick={(e) => logoutWithRedirect()}
                                id={language.LOGOUT}>
                                    <AiOutlinePoweroff className="mr-3 mb-1" />{language.LOGOUT}
                            </Nav.Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>}
            </div>}
        </Navbar.Collapse>
  </Navbar>
}