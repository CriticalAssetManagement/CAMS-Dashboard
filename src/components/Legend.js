import React from "react"
import {Card} from "react-bootstrap"
import {VARIANT} from "./constants"
import {BsSquareFill} from "react-icons/bs"

export const Legend = () => {
    return <Card>
        <Card.Body className="d-flex">
            <div className="d-flex float-right col-md-1">
                <BsSquareFill className="text-success me-1 mt-1"/>
                <small className={`text-${VARIANT}`}>Non Critical</small>
            </div>
            <div className="d-flex float-right mr-2">
                <BsSquareFill className="text-danger me-1 mt-1"/>
                <small className={`text-${VARIANT}`}>Critical</small>
            </div>
        </Card.Body>
    </Card>
}
