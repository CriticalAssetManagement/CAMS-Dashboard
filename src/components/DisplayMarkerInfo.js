
import React, {useState, useLayoutEffect} from "react"
import {Offcanvas, Container, Row, Col} from "react-bootstrap"
import {Status} from "./Status"
import {InfoIcons} from "./InfoIcons"
import {RiArrowGoBackFill} from "react-icons/ri"

const DisplayLinks = ({dependencies, info}) => {
    if (!Array.isArray(dependencies)) return <div/>

    return <React.Fragment>
        <Status documents = {dependencies} info={info}/>
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