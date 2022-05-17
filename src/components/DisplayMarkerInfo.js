
import React, {useState, useEffect} from "react"
import {Offcanvas, Button, Alert} from "react-bootstrap"
import {VAR_NAME, LAT, LNG, EMPTY_DESCRIPTION, VAR_ASSET_IDENTIFIER, HIDE_OFFCANVAS_TITLE, VAR_DESCRIPTION, VAR_LAST_MAINTAINED, VAR_DESIGN_STANDARDS} from "./constants"
//import {ASSET_FORM_PAGE} from "../routing/constants"
import {InfoBar} from "./InfoBar"
import {DependentStatus} from "./DependentStatus"
import {RiArrowGoBackFill} from "react-icons/ri"
import {FiCompass} from "react-icons/fi"
import {AccordianSection} from "./AccordianSection"
import {MdDesignServices} from "react-icons/md"
import {FaMapMarkerAlt, FaGlasses} from "react-icons/fa"
import {BsCalendarDate} from "react-icons/bs"
import {GoTriangleLeft} from "react-icons/go"


export const ClickedMarkerInfo = ({info, dependencies}) => {

    if(!Object.keys(info).length) return <div/>
    let displayInfo = []

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

    // if only info and no dependencies available
    if(!Array.isArray(dependencies)) return <React.Fragment>{displayInfo}</React.Fragment>

    return <React.Fragment>
        {displayInfo}
        <InfoBar documents = {dependencies} info={info}/>
        <AccordianSection asset = {info.id}/>

    </React.Fragment>
}

const NoDependents = ({info}) => {
    return <Alert variant="warning">
        <p>{`No dependencies available for Asset - ${info[VAR_NAME]}`}</p>
    </Alert>
}

const DisplayLinks = ({dependencies, info}) => {
    //if (!Array.isArray(dependencies)) return <div/>

    return <React.Fragment>
        <ClickedMarkerInfo info={info} dependencies={dependencies}/>
        {Array.isArray(dependencies) && <DependentStatus documents = {dependencies}/>}
        {!Array.isArray(dependencies) && <NoDependents info = {info}/>}
    </React.Fragment>
}


export const DisplayMarkerInfo = ({info, dependencies}) => {
    const [sidebarOpen, setSideBarOpen] = useState(false)
    const [position, setPosition] = useState("end")

    const handleViewSidebar = () => {
        setSideBarOpen(false)
    }

    if(!info) return <div/>

    //console.log("sidebarOpen", sidebarOpen)

    function handleClickToggle() {
        setSideBarOpen(true)
    }

    useEffect(() => {
        setSideBarOpen(true)
    }, [info.refresh]) // onchange of owner

    return <React.Fragment>

        <Offcanvas show={sidebarOpen} scroll={true} restoreFocus={true} backdrop={false} placement={position} className="h-auto">
            <Offcanvas.Header>
                <Offcanvas.Title>{info[VAR_NAME]}</Offcanvas.Title>
                <Button variant="light"  onClick={handleViewSidebar} title={HIDE_OFFCANVAS_TITLE}>
                    <RiArrowGoBackFill/>
                </Button>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {info.hasOwnProperty(VAR_DESCRIPTION) && info[VAR_DESCRIPTION].length && info[VAR_DESCRIPTION]}
                {!info.hasOwnProperty(VAR_DESCRIPTION) && EMPTY_DESCRIPTION }
                <DisplayLinks dependencies={dependencies} info={info}/>
            </Offcanvas.Body>
        </Offcanvas>



        {!sidebarOpen && <Offcanvas show={true} backdrop={false} placement={position} className="offcanvas-show-button">
            <Button onClick={handleClickToggle} variant={"light"} className="sidebar-toggle">
                <GoTriangleLeft/>
            </Button>
        </Offcanvas>}
    </React.Fragment>
}

