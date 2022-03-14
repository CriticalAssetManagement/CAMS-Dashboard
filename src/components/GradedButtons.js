
import React from "react"
import {Button} from "react-bootstrap"
import {BG_AMBER, BG_GOLD, BG_FIRE, BG_DIJON, BG_RED, BG_CHILI, BG_BURGUNDY, BG_SANGRIA} from "./constants"

export const GradedButtons = ({setCurrentGrade}) => {

    function handleGrade(e) {
        if(setCurrentGrade) setCurrentGrade(e.target.id)
    }

    return <React.Fragment>
         <Button variant="dark" onClick={handleGrade} id="1" className="border-0" style={{backgroundColor: BG_AMBER}} title="Category 1">1</Button>
         <Button variant="dark" onClick={handleGrade} id="2" className="border-0" style={{backgroundColor: BG_GOLD}} title="Category 2">2</Button>
         <Button variant="dark" onClick={handleGrade} id="3" className="border-0" style={{backgroundColor: BG_FIRE}} title="Category 3">3</Button>
         <Button variant="dark" onClick={handleGrade} id="4" className="border-0" style={{backgroundColor: BG_DIJON}} title="Category 4">4</Button>
         <Button variant="dark" onClick={handleGrade} id="5" className="border-0" style={{backgroundColor: BG_RED}} title="Category 5">5</Button>
         <Button variant="dark" onClick={handleGrade} id="6" className="border-0" style={{backgroundColor: BG_CHILI}} title="Category 6">6</Button>
         <Button variant="dark" onClick={handleGrade} id="7" className="border-0" style={{backgroundColor: BG_BURGUNDY}} title="Category 7">7</Button>
         <Button variant="dark" onClick={handleGrade} id="8" className="border-0" style={{backgroundColor: BG_SANGRIA}} title="Category 8">8</Button>
    </React.Fragment>
}