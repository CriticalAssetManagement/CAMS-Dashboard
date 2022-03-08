
import React, {useState, useLayoutEffect} from "react"
import {Offcanvas, Nav, Button} from "react-bootstrap"
import {ASSET_FORM} from "./constants"
import {ASSET_FORM_PAGE} from "../routing/constants"
import {NavLink as RouterNavLink} from "react-router-dom"
import {Status} from "./Status"
import {InfoIcons} from "./InfoIcons"
import {WOQLClientObj} from '../init-woql-client'
import {RiArrowGoBackFill} from "react-icons/ri"
import {FiMoreHorizontal} from "react-icons/fi"
import {AccordianSection} from "./AccordianSection"
import {MdOutlineDoubleArrow} from "react-icons/md"

const ClickedMarkerInfo = ({info}) => {
    if(!Object.keys(info).length) return <div/>
    let displayInfo = []

    const {
		setPage
	} = WOQLClientObj()

    for(var key in info) {
        if(key === "refresh") continue
        displayInfo.push(<span className="d-flex m-2">
            <small className="col-md-6 text-break text-primary fw-bold">{key}</small>
            <span className="col-md-6 text-break">{info[key]}</span>
        </span>)
    }

    return <React.Fragment>
        {displayInfo}
        <Nav.Link
            as={RouterNavLink}
            title={ASSET_FORM}
            to={ASSET_FORM_PAGE}
            exact
            id={ASSET_FORM}
            onClick={(e) => setPage(ASSET_FORM_PAGE)}
        >
            <div className="d-flex bg-light justify-content-center">
                <label className="m-2 text-dark ">View Asset</label>
                <h5 className="text-dark mt-2"><FiMoreHorizontal/></h5>
            </div>
        </Nav.Link>
    </React.Fragment>
}

const DisplayLinks = ({dependencies, info}) => {
    if (!Array.isArray(dependencies)) return <div/>

    return <React.Fragment>
        <ClickedMarkerInfo info={info}/>
        <hr/>
        <Status documents = {dependencies} info={info}/>
        <hr/>
        <AccordianSection asset = {info.id}/>
        <InfoIcons documents = {dependencies}/>
    </React.Fragment>
}



export const DisplayMarkerInfo = ({info, dependencies}) => {
    const [sidebarOpen, setSideBarOpen] = useState(true)
    const [position, setPosition] = useState("end")

    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen)
    }


    if(!info) return <div/>

    return <React.Fragment>

        <Offcanvas show={sidebarOpen} scroll={true} onHide={handleViewSidebar} backdrop={false} placement={position} className="h-auto">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{info.name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {`Some text or description regarding chosen asset ${info.name}. Can be generic
                    status or deets on this asset - maybe a picture? `}
                <DisplayLinks dependencies={dependencies} info={info}/>
            </Offcanvas.Body>
        </Offcanvas>

        {/*!sidebarOpen && <Offcanvas show={true} onHide={handleViewSidebar} backdrop={false} placement={position} className="offcanvas-show-button">
            <Button onClick={handleViewSidebar} variant={"light"} className="sidebar-toggle">
                TOGGLE
                <MdOutlineDoubleArrow/>
            </Button>
        </Offcanvas>*/}
    </React.Fragment>
}

