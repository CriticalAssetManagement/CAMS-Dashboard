
import React, {useState, useLayoutEffect} from "react"
import {Offcanvas, Nav} from "react-bootstrap"
import {ASSET_FORM} from "./constants"
import {ASSET_FORM_PAGE} from "../routing/constants"
import {NavLink as RouterNavLink} from "react-router-dom"
import {Status} from "./Status"
import {InfoIcons} from "./InfoIcons"
import {WOQLClientObj} from '../init-woql-client'
import {RiArrowGoBackFill} from "react-icons/ri"
import {FiMoreHorizontal} from "react-icons/fi"

const ClickedMarkerInfo = ({info}) => {
    if(!Object.keys(info).length) return <div/>
    let displayInfo = []

    const {
		setPage
	} = WOQLClientObj()

    for(var key in info) {
        if(key === "refresh") continue
        displayInfo.push(<span className="d-flex m-2">
            <small className="col-md-6 text-break text-info fw-bold">{key}</small>
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

                <label className="m-2 text-dark ">More Info</label>
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
        <InfoIcons documents = {dependencies}/>
    </React.Fragment>
}

function getCloseLabel() {
    return <RiArrowGoBackFill/>
}

export const DisplayMarkerInfo = ({info, dependencies}) => {
    const [sidebarOpen, setSideBarOpen] = useState(true)
    const [position, setPosition] = useState("end")


    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    }

    if(!info) return <div/>

    return <React.Fragment>

        <Offcanvas show={sidebarOpen} onHide={handleViewSidebar} backdrop={false} placement={position} className="h-auto">
            <Offcanvas.Header closeButton closeLabel={getCloseLabel()}>
                <Offcanvas.Title>{info.name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {`Some text or description regarding chosen asset ${info.name}. Can be generic
                    status or deets on this asset - maybe a picture? `}
                <DisplayLinks dependencies={dependencies} info={info}/>
            </Offcanvas.Body>
        </Offcanvas>

        {/*<button onClick={handleViewSidebar} className="sidebar-toggle">
            Toggle Sidebar
        </button>*/}
    </React.Fragment>
}

/*
<Offcanvas show={true} backdrop={false} placement={"bottom"} style={{height: "fit-content"}}>
        <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
    </Offcanvas>
    */

    /*
    const [sidebarOpen, setSideBarOpen] = useState(true);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    }

    const sidebarClass = sidebarOpen ? "sidebar open" : "sidebar";

    return <div className={`${sidebarClass} `}>
        <div> I slide into view </div>
        <div> Me Too! </div>
        <div> Me Three! </div>
        <button onClick={handleViewSidebar} className="sidebar-toggle">
            Toggle Sidebar
        </button>
    </div>*/