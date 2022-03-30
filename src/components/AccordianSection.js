import React, {useState, useEffect} from "react"
import Accordion from 'react-bootstrap/Accordion'
import {OWNER_ACCORDIAN_TITLE, ASSET_DEPENDENCY_ACCORDIAN_TITLE, NO_OWNER_INFO} from "./constants"
import {BsTelephoneFill} from "react-icons/bs"
import {QueryHook} from "../hooks/QueryHook"
import {WOQLClientObj} from '../init-woql-client'
import {getOwnerDetailsQuery} from "../hooks/queries"
import {ProgressBar} from "react-bootstrap"
import {FiLink} from "react-icons/fi"
import {AiOutlineMail} from "react-icons/ai"
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

/**
 * document - asset on which user has clicked
 * documents - dependant assets on document
*/
export const AccordianSection = ({asset, documents}) =>{
    const [query, setQuery] = useState(false)
    const [ownerInfo, setOwnerInfo] = useState(false)

    const {
        woqlClient,
        setSuccessMsg,
        setErrorMsg,
        loading,
        setLoading,
	} = WOQLClientObj()

    // get document location on select of an Asset
    let queryResults = QueryHook(woqlClient, query, setLoading)

    useEffect(() => {
        if(!woqlClient) return
        if(!asset) return
        let q = getOwnerDetailsQuery(asset)
        setQuery(q)
    }, [asset])

    useEffect(() => {
        let info = []
        if(queryResults.length) {

            queryResults.map(qr=> {
                info.push(
                    <Toast className="w-100 mb-4">
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">{qr.Name["@value"]}</strong>
                        </Toast.Header>
                        <Toast.Body>
                            <div>
                                <BsTelephoneFill className="col-md-2 text-primary h5" title="Phone"/>
                                <a href={`tel:${qr.PhoneNumber["@value"]}`}>{qr.PhoneNumber["@value"]}</a>
                            </div>
                            <div>
                                <AiOutlineMail className="col-md-2 text-primary h5" title="Email"/>
                                <span>{qr.Email["@value"]}</span>
                            </div>
                        </Toast.Body>
                    </Toast>
                )
            })
            setLoading(false)
        }
        else {

            info.push(
                <React.Fragment>{NO_OWNER_INFO}</React.Fragment>
            )
        }
        setOwnerInfo(info)
    }, [queryResults])


    return <Accordion className="mt-4 mb-4">
        <Accordion.Item eventKey="0">
            <Accordion.Header>
                <span className="d-flex w-100">
                    <span className="col-md-6 text-break text-primary fw-bold" title={OWNER_ACCORDIAN_TITLE}>
                        {OWNER_ACCORDIAN_TITLE}
                    </span>
                </span>
            </Accordion.Header>
            <Accordion.Body>
                {loading && <ProgressBar animated now={100} variant="info"/>}
                {ownerInfo && ownerInfo}
            </Accordion.Body>
        </Accordion.Item>
        {/*<Accordion.Item eventKey="1">
            <Accordion.Header>
                <FiLink className="me-4"/>
                {ASSET_DEPENDENCY_ACCORDIAN_TITLE}
            </Accordion.Header>
            <Accordion.Body>

            </Accordion.Body>
        </Accordion.Item> */}
  </Accordion>
}