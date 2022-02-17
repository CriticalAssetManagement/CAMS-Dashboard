
import React, {useState, useEffect} from "react"
import {Row, Col, Card} from "react-bootstrap"

export const Status = ({documents, onMarkerClick}) => {
    const [critical, setCritical]=useState(false)
    const [nonCritical, setNonCritical]=useState(false)

    let documentId = onMarkerClick.hasOwnProperty("name") ? onMarkerClick.name : ""

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

    return <div className="mb-3 mt-5">
        <h5 className="text-info mb-5">{`${documentId}`}</h5>
        <Row>
            <Col md={3}>
                <Card border={"danger"}>
                    <Card.Body className="d-flex">
                        <small className="text-dark mt-2">Critical Assets</small>
                        <h2 className="text-danger ml-5">
                            {critical}
                        </h2>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3}>
                <Card border={"success"}>
                    <Card.Body className="d-flex">
                        <small className="text-dark mt-2">Non Critical Assets</small>
                        <h2 className="text-success ml-5">
                            {nonCritical}
                        </h2>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
}