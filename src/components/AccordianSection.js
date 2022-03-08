import React, {useState, useEffect} from "react"
import Accordion from 'react-bootstrap/Accordion'
import {OWNER_ACCORDIAN_TITLE, ASSET_DEPENDENCY_ACCORDIAN_TITLE, NO_OWNER_INFO} from "./constants"
import {BsTelephoneOutbound} from "react-icons/bs"
import {QueryHook} from "../hooks/QueryHook"
import {WOQLClientObj} from '../init-woql-client'
import {getOwnerDetailsQuery} from "../hooks/queries"
import {ProgressBar} from "react-bootstrap"
import {BsBookmark} from "react-icons/bs"
import {FiLink} from "react-icons/fi"
import {InfoIcons} from "./InfoIcons"

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
                <React.Fragment>
                    <div className="mt-2 mb-2 text-muted">
                        <BsBookmark className="me-2"/>{qr.Name["@value"]}
                    </div>
                    <div>
                        <span className="me-4 text-muted">Phone</span>
                        <a href={`tel:${qr.PhoneNumber["@value"]}`}>{qr.PhoneNumber["@value"]}</a>
                    </div>
                    <div>
                        <span className="me-4 text-muted">Email</span>
                        <span>{qr.Email["@value"]}</span>
                    </div>
                    <hr/>
                </React.Fragment>
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


    return <Accordion>
        <Accordion.Item eventKey="0">
            <Accordion.Header>
                <BsTelephoneOutbound className="me-4"/>
                {OWNER_ACCORDIAN_TITLE}
            </Accordion.Header>
            <Accordion.Body>
                {loading && <ProgressBar animated now={100} variant="info"/>}
                {ownerInfo}
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
            <Accordion.Header>
                <FiLink className="me-4"/>
                {ASSET_DEPENDENCY_ACCORDIAN_TITLE}
            </Accordion.Header>
            <Accordion.Body>

            </Accordion.Body>
        </Accordion.Item>
  </Accordion>
}