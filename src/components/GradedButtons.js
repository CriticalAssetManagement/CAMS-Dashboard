
import React, {useState, useEffect} from "react"
import {Button} from "react-bootstrap"
import {BG_AMBER, BG_GOLD, BG_FIRE, BG_DIJON, BG_RED, BG_CHILI, BG_BURGUNDY, BG_SANGRIA} from "./maps/markers"

export const GradedButtons = ({setCurrentGrade, max}) => {

    function handleGrade(e) {
        if(setCurrentGrade) setCurrentGrade(e.target.id)
    }
    const [grades, setGrades]=useState(false)

    useEffect(() => {
        if(max) {
            let buttonList = []
            for(var count = 1; count < max+1; count ++) { // review this bit - with (max)
                var color
                if(count === 1) color=BG_AMBER
                else if(count === 2) color=BG_DIJON
                else if(count === 3) color=BG_RED
                else if(count === 4) color=BG_CHILI
                else if(count === 5) color=BG_BURGUNDY
                buttonList.push(
                    <Button variant="dark"
                        onClick={handleGrade}
                        id={count}
                        className="border-0"
                        style={{backgroundColor: color}}
                        title={`Category ${count}`}>
                            {count}
                    </Button>
                )
            }
            setGrades(buttonList)
        }
    }, [max])

    return <React.Fragment>
        {grades && grades}
    </React.Fragment>
}

  /*
     <Button variant="dark" onClick={handleGrade} id="1" className="border-0" style={{backgroundColor: BG_AMBER}} title="Category 1">1</Button>
         <Button variant="dark" onClick={handleGrade} id="2" className="border-0" style={{backgroundColor: BG_GOLD}} title="Category 2">2</Button>
         <Button variant="dark" onClick={handleGrade} id="3" className="border-0" style={{backgroundColor: BG_FIRE}} title="Category 3">3</Button>
         <Button variant="dark" onClick={handleGrade} id="4" className="border-0" style={{backgroundColor: BG_DIJON}} title="Category 4">4</Button>
         <Button variant="dark" onClick={handleGrade} id="5" className="border-0" style={{backgroundColor: BG_RED}} title="Category 5">5</Button>
         <Button variant="dark" onClick={handleGrade} id="6" className="border-0" style={{backgroundColor: BG_CHILI}} title="Category 6">6</Button>
         <Button variant="dark" onClick={handleGrade} id="7" className="border-0" style={{backgroundColor: BG_BURGUNDY}} title="Category 7">7</Button>
         <Button variant="dark" onClick={handleGrade} id="8" className="border-0" style={{backgroundColor: BG_SANGRIA}} title="Category 8">8</Button>

         */