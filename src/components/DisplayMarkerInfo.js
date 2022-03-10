
import React, {useState, useLayoutEffect} from "react"
import {Offcanvas, Nav, Button} from "react-bootstrap"
import {ASSET_FORM, VAR_NAME, LAT, LNG, VAR_ASSET_IDENTIFIER, VAR_LAST_MAINTAINED, VAR_DESIGN_STANDARDS} from "./constants"
import {ASSET_FORM_PAGE} from "../routing/constants"
import {NavLink as RouterNavLink} from "react-router-dom"
import {Status} from "./Status"
import {DependentStatus} from "./DependentStatus"
import {WOQLClientObj} from '../init-woql-client'
import {RiArrowGoBackFill} from "react-icons/ri"
import {FiMoreHorizontal, FiCompass} from "react-icons/fi"
import {AccordianSection} from "./AccordianSection"
import {MdDesignServices} from "react-icons/md"
import {FaMapMarkerAlt, FaGlasses} from "react-icons/fa"
import {BsCalendarDate} from "react-icons/bs"
import Badge from 'react-bootstrap/Badge'

const ClickedMarkerInfo = ({info}) => {
    if(!Object.keys(info).length) return <div/>
    let displayInfo = []

    const {
		setPage
	} = WOQLClientObj()



    for(var key in info) {
        if(key === "refresh") continue
        else if(key === VAR_NAME) {
            displayInfo.push(
                <span className="d-flex m-2 mt-4">
                    <FaMapMarkerAlt className="col-md-2 text-primary h4" title={key}/>
                    <span className="col-md-6 text-break" title={key}>{info[key]}</span>
                </span>
            )
        }
        else if (key === LNG) continue
        else if (key === LAT) {
            displayInfo.push(
                <span className="d-flex m-2">
                    <FiCompass className="col-md-2 text-primary h4" title={"Coordinates"}/>
                    <span className="col-md-6 text-break" title={"Coordinates"}>{`${info[LAT]}, ${info[LNG]}`}</span>
                </span>
            )
        }
        else if (key === VAR_ASSET_IDENTIFIER) {
            displayInfo.push(
                <span className="d-flex m-2">
                    <FaGlasses className="col-md-2 text-primary h4" title={key}/>
                    <span className="col-md-6 text-break" title={key}>{info[key]}</span>
                </span>
            )
        }
        else if (key === VAR_DESIGN_STANDARDS) {
            displayInfo.push(
                <span className="d-flex m-2">
                    <MdDesignServices className="col-md-2 text-primary h4" title={key}/>
                    <span className="col-md-6 text-break" title={key}>{info[key]}</span>
                </span>
            )
        }
        else if (key === VAR_LAST_MAINTAINED) {
            displayInfo.push(
                <span className="d-flex m-2">
                    <BsCalendarDate className="col-md-2 text-primary h4" title={key}/>
                    <span className="col-md-6 text-break" title={key}>
                        {new Date(info[key]).toLocaleDateString()}
                    </span>
                </span>
            )
        }
    }

    function handleMoreInfo(e) {
        setPage(ASSET_FORM_PAGE)
    }

    return <React.Fragment>
        {displayInfo}

        <div class="text-right">
            <Badge bg="transparent" pill className="mt-3 h6 go-to-asset-badge">
                <Nav.Link
                    as={RouterNavLink}
                    title={ASSET_FORM}
                    to={ASSET_FORM_PAGE}
                    exact
                    style={{padding: 0}}
                    id={ASSET_FORM}
                    onClick={(e) => handleMoreInfo(e)}
                >
                    <div className="d-flex justify-content-center">
                        <label className="m-1 text-primary mt-2">More Info</label>
                        <h5 className="text-primary "><FiMoreHorizontal/></h5>
                    </div>
                </Nav.Link>
            </Badge>
        </div>
        <hr/>
        <AccordianSection asset = {info.id}/>

    </React.Fragment>
}

const DisplayLinks = ({dependencies, info}) => {
    if (!Array.isArray(dependencies)) return <div/>

    return <React.Fragment>
        <ClickedMarkerInfo info={info}/>
        <hr/>

        <Status documents = {dependencies} info={info}/>
        <hr/>
        <DependentStatus documents = {dependencies}/>
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
                <Offcanvas.Title>{info[VAR_NAME]}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {`Some text or description regarding chosen asset ${info[VAR_NAME]}. Can be generic
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

