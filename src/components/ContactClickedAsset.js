import React, {useState, useEffect} from "react"
import {Offcanvas, Button} from "react-bootstrap"
import {VAR_NAME, LAT, LNG, EMPTY_DESCRIPTION, VAR_ASSET_IDENTIFIER, VAR_DESCRIPTION, HIDE_OFFCANVAS_TITLE, VAR_LAST_MAINTAINED, VAR_DESIGN_STANDARDS} from "./constants"
import {ClickedMarkerInfo} from "./DisplayMarkerInfo"
import {AccordianSection} from "./AccordianSection"
import {RiArrowGoBackFill} from "react-icons/ri"

export const ContactClickedAsset =({info, ownerResults}) => {
    const [open, setOpen] = useState(null)

    const handleViewSidebar = () => {
        setOpen(null)
    }

    useEffect(() => {
        setOpen(true)
    }, [ownerResults[0].Owner]) // onchange of owner


    return <Offcanvas show={open} restoreFocus={true} scroll={true} backdrop={false} placement={"end"} className="h-auto">
        <Offcanvas.Header >
            <Offcanvas.Title>{info[VAR_NAME]}</Offcanvas.Title>
            <Button variant="light"  onClick={handleViewSidebar} title={HIDE_OFFCANVAS_TITLE}>
                <RiArrowGoBackFill/>
            </Button>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {info.hasOwnProperty(VAR_DESCRIPTION) && info[VAR_DESCRIPTION].length && info[VAR_DESCRIPTION]}
            {!info.hasOwnProperty(VAR_DESCRIPTION) && EMPTY_DESCRIPTION }
            <ClickedMarkerInfo info={info}/>
            <AccordianSection asset = {info.id}/>
        </Offcanvas.Body>
    </Offcanvas>



}