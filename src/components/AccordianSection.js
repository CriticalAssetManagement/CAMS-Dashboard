import React, {useState, useEffect} from "react"
import Accordion from 'react-bootstrap/Accordion'
import {Button, Stack} from "react-bootstrap"
import {OWNER_ACCORDIAN_TITLE, NO_OWNER_INFO, VAR_NAME, VAR_ASSET} from "./constants"
import {BsTelephoneFill} from "react-icons/bs"
import {QueryHook} from "../hooks/QueryHook"
import {WOQLClientObj} from '../init-woql-client'
import {getOwnerDetailsQuery} from "../hooks/queries"
import {ProgressBar} from "react-bootstrap"
import {FiLink} from "react-icons/fi"
import {AiOutlineMail} from "react-icons/ai"
import {getAssetOwnerChainQuery} from "../hooks/queries"
import Toast from 'react-bootstrap/Toast'
import {getFailureChainAssetLocation} from "./utils"
import { CSVLink, CSVDownload } from "react-csv"
import {FaInfoCircle} from "react-icons/fa"

/**
 * document - asset on which user has clicked
 * documents - dependant assets on document
*/
export const AccordianSection = ({info}) =>{
    const [query, setQuery] = useState(false)
    const [ownerInfo, setOwnerInfo] = useState(false)
    const [ownerQuery, setOwnerQuery]=useState(false)
    const [ownerData, setOwnerData]=useState([])

    const {
        woqlClient,
        setSuccessMsg,
        setErrorMsg,
        loading,
        setLoading,
        language
	} = WOQLClientObj()

    // get document location on select of an Asset
    let queryResults = QueryHook(woqlClient, query, setLoading)
    // get owner of all dependant assets
    let ownerResults = QueryHook(woqlClient, ownerQuery, setLoading)

    useEffect(() => {
        if(Array.isArray(ownerResults) && ownerResults.length) {
            let or = getFailureChainAssetLocation(ownerResults) 
            setOwnerData(or)
        }
    }, [ownerResults])

    useEffect(() => {
        if(!woqlClient) return
        if(!info[VAR_ASSET]) return
        let q = getOwnerDetailsQuery(info[VAR_ASSET])
        setQuery(q)
    }, [info[VAR_ASSET]])

    useEffect(() => {
        let infoDisplay = []
        if(queryResults.length) {

            queryResults.map(qr=> {
                infoDisplay.push(
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
        }
        else {
            infoDisplay.push(
                <p>{language.NO_OWNER_INFO}</p>
            )
        }
        setOwnerInfo(infoDisplay)
    }, [queryResults])

    async function handleContactList(e) {
        setOwnerQuery(getAssetOwnerChainQuery(info[VAR_ASSET]))
    }

    return <Accordion className="mt-4">
        <Accordion.Item eventKey="0">
            <Accordion.Header>
                <span className="d-flex w-100">
                    <span className="col-md-6 text-break text-primary fw-bold" title={OWNER_ACCORDIAN_TITLE}>
                        {language.OWNER_ACCORDIAN_TITLE} 
                    </span>
                </span>
            </Accordion.Header> 
            <Accordion.Body>
                {loading && <ProgressBar animated now={100} variant="info"/>}
                <Stack gap={3}>
                    {ownerInfo && <div>
                        <small>{`${language.CLICKED_CONTACT_LIST_ASSET} ${info[VAR_NAME]}`}</small>
                        {ownerInfo}
                    </div>}
                    <Toast className="w-100 mb-4">
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">
                                {language.EXPORT_CSV_DESCRIPTION}
                            </strong>
                        </Toast.Header>
                        <Toast.Body className="text-center">
                            <Button className="w-100 btn-sm" onClick={handleContactList}>
                                {language.EXPORT_OWNER_LIST}
                            </Button>
                            {ownerData.length > 0 && <CSVDownload data={ownerData} target="_blank"></CSVDownload>}
                        </Toast.Body>
                    </Toast>
                </Stack>
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

/* <FaInfoCircle className="pr-2 text-info"/>
<Button onClick={handleContactList}>
                        {language.EXPORT_OWNER_LIST}
                    </Button>
                    {ownerData.length > 0 && <CSVDownload data={ownerData} target="_blank"></CSVDownload>}*/