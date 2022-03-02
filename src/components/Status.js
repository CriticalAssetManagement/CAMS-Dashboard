
import React, {useState, useEffect} from "react"
import {Row, Alert} from "react-bootstrap"
import {CRITICAL_LINKS, NON_CRITICAL_LINKS} from "./constants"

export const Status = ({documents, info}) => {
    const [critical, setCritical]=useState(false)
    const [nonCritical, setNonCritical]=useState(false)

    let documentId = info.hasOwnProperty("name") ? info.name : ""

    useEffect(() => {
        if(Array.isArray(documents) && documents.length){
            let criticalSum = 0, nonCriticalSum = 0
            documents.map(docs => {
                if(docs.critical === 'true') criticalSum += 1 // have stored as string to display in WOQLTable
                if(docs.critical === 'false') nonCriticalSum += 1
            })
            setCritical(criticalSum)
            setNonCritical(nonCriticalSum)
        }
    }, [documents])


    return <div className="mb-3 mt-5 p-2">
        <Row className="w-100">
            <div>
                <Alert variant={"danger"} className="d-flex">
                    <small className="text-dark mt-2">{CRITICAL_LINKS}</small>
                    <h2 className="text-danger  col-md-6">
                        {critical}
                    </h2>
                </Alert>
            </div>
            <div>
                <Alert variant={"success"} className="d-flex">
                    <small className="text-dark mt-2">{NON_CRITICAL_LINKS}</small>
                    <h2 className="text-success col-md-6">
                        {nonCritical}
                    </h2>
                </Alert>
            </div>
        </Row>
    </div>
}