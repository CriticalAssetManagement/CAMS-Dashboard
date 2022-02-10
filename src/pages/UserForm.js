import React, {useEffect, useState} from "react"
import {Layout} from "../components/Layout"
import {Container, Row, ProgressBar} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {Form} from "../components/Form"
import {USER_TYPE, CREATE_MODE, VIEW_MODE, USER_PAGE_TABLE_CSS, CREATE_USER_TAB, VIEW_USER_LIST, VIEW_CLICKED_USER} from "./constants"
import {Alerts} from "../components/Alerts"
import {DocumentHook, GetDocumentListHook, GetDocumentHook} from "../hooks/DocumentHook"
import {handleDocumentSelect} from "../components/utils"
import {Table} from "../components/Table"
import {getUserConfig} from "../components/Views"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

export const UserForm = () => {

    const {
		connectionError,
        frames,
        successMsg,
        setSuccessMsg,
        errorMsg,
        setErrorMsg,
        woqlClient,
        clearMessages,
        loading,
        setLoading,
        refresh,
        setRefresh
	} = WOQLClientObj()

    const [documentId, setDocumentId] = useState(false) // view a document
    const [extracted, setExtracted] = useState(false) //create document
    const [tabKey, setTabKey] = useState(VIEW_USER_LIST)
    const [showDocument, setShowDocument] = useState(false)

    // create
    let result=DocumentHook(woqlClient, extracted, setLoading, setSuccessMsg, setErrorMsg)
    //view all document
    let userResults=GetDocumentListHook(woqlClient, USER_TYPE, refresh, setLoading, setSuccessMsg, setErrorMsg)
    //get a document
    let documentResults=GetDocumentHook(woqlClient, documentId, setLoading, setSuccessMsg, setErrorMsg)

    useEffect(() => {   // on changing tabs
        if(tabKey === VIEW_USER_LIST) {
            setRefresh(Date.now())
            clearClickedDocument()
        }
        else if(tabKey === CREATE_USER_TAB) {
            clearClickedDocument()
        }
        setSuccessMsg(false)
        setErrorMsg(false)
    }, [tabKey])

    useEffect(() => {
        if(Object.keys(documentResults).length){
            setShowDocument(documentResults)
        }
    }, [documentResults])

    function clearClickedDocument() {
        //hide clicked document info
        setDocumentId(false)
        setShowDocument(false)
    }

    function handleSubmit(data) {
        if(!data.hasOwnProperty("@type")) data["@type"] = USER_TYPE
        clearMessages()
        setExtracted(data)
    }

    function handleSelect(inp, type) {
        if(!inp) return
        return handleDocumentSelect(woqlClient, inp, type)
    }

    function onRowClick(row) {
        if(row.hasOwnProperty("values") && row.values.hasOwnProperty("@id")) {
            setDocumentId(row.values["@id"])
            setTabKey(VIEW_CLICKED_USER)
        }
    }

    return <Container fluid="lg" className="mt-5 mb-5">
        <Layout/>
        <Alerts errorMsg={connectionError}/>
        {loading && <ProgressBar animated now={100} variant="info"/>}

        <Tabs
            id="controlled-tab"
            activeKey={tabKey}
            onSelect={(k) => setTabKey(k)}
            className="mb-3"
        >
            <Tab eventKey={VIEW_USER_LIST} title={VIEW_USER_LIST}>
                <Row className="text-break">
                    {userResults &&
                        <Table documents = {userResults}
                            config={getUserConfig(userResults, onRowClick)}
                            css={USER_PAGE_TABLE_CSS}/>
                    }
                </Row>
            </Tab>
            {showDocument &&  <Tab eventKey={VIEW_CLICKED_USER} title={VIEW_CLICKED_USER}>
                    <Row className="text-break">
                        <Form frames={frames}
                            type={USER_TYPE}
                            mode={VIEW_MODE}
                            hideSubmit={true}
                            onSelect={handleSelect}
                            formData={showDocument}
                        />
                    </Row>
                </Tab>
            }
            <Tab eventKey={CREATE_USER_TAB} title={CREATE_USER_TAB}>
                {frames &&
                    <Form frames={frames}
                        type={USER_TYPE}
                        mode={CREATE_MODE}
                        onSubmit={handleSubmit}
                        onSelect={handleSelect}
                    />
                }
            </Tab>
        </Tabs>

        <Alerts successMsg={successMsg}/>
        <Alerts errorMsg={errorMsg}/>
    </Container>

}