import React, {useEffect} from "react"
import {Layout} from "../components/Layout"
import {Container, ProgressBar} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {AREA_TYPE, AREA_PAGE_TABLE_CSS, EDIT_CLICKED_AREA, CREATE_AREA_TAB, VIEW_AREA_LIST, VIEW_CLICKED_AREA} from "./constants"
import {Alerts} from "../components/Alerts"
import {DocumentHook, GetDocumentListHook, GetDocumentHook, DeleteDocumentHook, EditDocumentHook} from "../hooks/DocumentHook"
import {getAreaConfig} from "../components/Views"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {DocumentContextObj} from "../hooks/DocumentContextProvider"
import {DisplayDocuments, ViewDocument, CreateDocument, EditDocument} from "../components/Display"


export const AreaForm = () => {

    const {
		connectionError,
        frames,
        successMsg,
        setSuccessMsg,
        errorMsg,
        setErrorMsg,
        woqlClient,
        loading,
        setLoading,
        refresh
	} = WOQLClientObj()

    const {
        onRowClick,
        documentId,
        tabKey,
        setTabKey,
        showDocument,
        setShowDocument,
        managePageTabs,
        handleDocumentSubmit,
        extracted,
        handleSelect,
        deleteDocument,
        handleUpdate,
        getDocumentToolBar,
        handleRefresh,
        editDocument,
        extractedUpdate,
        setDocumentId,
        setType,
        type
    } = DocumentContextObj()

    // create
    let result=DocumentHook(woqlClient, extracted, VIEW_AREA_LIST,handleRefresh, setLoading, setSuccessMsg, setErrorMsg)
    //view all document
    let areaResults=GetDocumentListHook(woqlClient, type, refresh, setLoading, setSuccessMsg, setErrorMsg)
    //get a document
    let documentResults=GetDocumentHook(woqlClient, documentId, setLoading, setSuccessMsg, setErrorMsg)
    // delete a document
    let deleteResult=DeleteDocumentHook(woqlClient, deleteDocument, VIEW_AREA_LIST, handleRefresh, setLoading, setSuccessMsg, setErrorMsg)
    // edit a document
    let editResult=EditDocumentHook(woqlClient, extractedUpdate, VIEW_CLICKED_AREA, handleRefresh, setDocumentId, setLoading, setSuccessMsg, setErrorMsg)


    useEffect(() => {
        // on changing tabs
        managePageTabs()
    }, [tabKey])

    useEffect(() => {
        setType(AREA_TYPE)
    }, []) // refresh area Results list on reload or change of tabs

    useEffect(() => {
        if(Object.keys(documentResults).length){
            // show view document tab only when a document is clicked
            setShowDocument(documentResults)
        }
    }, [documentResults])

    return <Container fluid="lg" className="mt-5 mb-5">
        <Layout/>
        <Alerts errorMsg={connectionError}/>
        {loading && <ProgressBar animated now={100} variant="info"/>}

        <Tabs id="controlled-tab"
            activeKey={tabKey}
            onSelect={(k) => setTabKey(k)}
            className="mb-3">
            <Tab eventKey={VIEW_AREA_LIST} title={VIEW_AREA_LIST}>
                <DisplayDocuments results={areaResults}
                    css={AREA_PAGE_TABLE_CSS}
                    config={getAreaConfig(areaResults, onRowClick)}
                    title={AREA_TYPE}
                    onRowClick={onRowClick}/>
            </Tab>
            {showDocument && !editDocument && <Tab eventKey={VIEW_CLICKED_AREA} title={VIEW_CLICKED_AREA}>

                    <ViewDocument frames={frames}
                        getDocumentToolBar={getDocumentToolBar}
                        handleSelect={handleSelect}
                        type={AREA_TYPE}
                        showDocument={showDocument}/>
                </Tab>
            }
            {editDocument && <Tab eventKey={EDIT_CLICKED_AREA} title={EDIT_CLICKED_AREA}>
                <EditDocument frames={frames}
                    getDocumentToolBar={getDocumentToolBar}
                    handleSelect={handleSelect}
                    type={AREA_TYPE}
                    handleUpdate={handleUpdate}
                    editDocument={editDocument}/>
                </Tab>
            }
            <Tab eventKey={CREATE_AREA_TAB} title={CREATE_AREA_TAB}>
                {frames && <CreateDocument frames={frames}
                    handleSelect={handleSelect}
                    type={AREA_TYPE}
                    handleSubmit={handleDocumentSubmit}/>}
            </Tab>
        </Tabs>

        <Alerts successMsg={successMsg}/>
        <Alerts errorMsg={errorMsg}/>
    </Container>

}