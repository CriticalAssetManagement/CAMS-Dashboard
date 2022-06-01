import React, {useEffect} from "react"
import {Layout} from "../components/Layout"
import {ProgressBar, Button} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {LINK_TYPE, LINK_PAGE_TABLE_CSS, EDIT_CLICKED_LINK, CREATE_LINK_TAB, VIEW_LINK_LIST, VIEW_CLICKED_LINK} from "./constants"
import {Alerts} from "../components/Alerts"
import {DocumentHook, GetDocumentListHook, GetDocumentHook, DeleteDocumentHook, EditDocumentHook} from "../hooks/DocumentHook"
import {getUserConfig} from "../components/Views"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {DocumentContextObj} from "../hooks/DocumentContextProvider"
import {DisplayDocuments, ViewDocument, CreateDocument, EditDocument} from "../components/Display"
import {BiArrowBack} from "react-icons/bi"
import { useAuth0 } from "@auth0/auth0-react"
import {Login} from "./Login"

export const LinkForm = () => {

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
        refresh,
        setRefresh
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
        handleTraverse,
        deleteDocument,
        handleUpdate,
        getDocumentToolBar,
        handleRefresh,
        editDocument,
        extractedUpdate,
        setDocumentId,
        setType,
        type,
        traverseDocument,
        goToPreviousLinkedDocument,
        tabControl
    } = DocumentContextObj()

    const {
        isAuthenticated
    } = useAuth0()


    // create
    let result=DocumentHook(woqlClient, extracted, VIEW_LINK_LIST, handleRefresh, setLoading, setSuccessMsg, setErrorMsg)
    //view all document
    let linkResults=GetDocumentListHook(woqlClient, type, refresh, setLoading, setSuccessMsg, setErrorMsg)
    //get a document
    let documentResults=GetDocumentHook(woqlClient, documentId, setLoading, setSuccessMsg, setErrorMsg)
    // delete a document
    let deleteResult=DeleteDocumentHook(woqlClient, deleteDocument, VIEW_LINK_LIST,handleRefresh, setLoading, setSuccessMsg, setErrorMsg)
    // edit a document
    let editResult=EditDocumentHook(woqlClient, extractedUpdate, VIEW_LINK_LIST, handleRefresh, setDocumentId, setLoading, setSuccessMsg, setErrorMsg)


    useEffect(() => {
        // on changing tabs
        managePageTabs()
    }, [tabKey])


    useEffect(() => {
        setType(LINK_TYPE)
    }, []) // refresh link Results list on reload or change of tabs


    useEffect(() => {
        if(Object.keys(documentResults).length){
            // show view document tab only when a document is clicked
            setShowDocument(documentResults)
        }
    }, [documentResults])


    return <div className="mb-5">
        <Layout/>

        {!isAuthenticated &&  <Login/>}

        {isAuthenticated && <div className="px-3 content-container">
            <Alerts errorMsg={connectionError}/>
            {loading && <ProgressBar animated now={100} variant="info"/>}

            <Tabs id="controlled-tab"
                activeKey={tabKey}
                onSelect={(k) => {setTabKey(k)}}
                className="mb-3">
               {tabControl.read && <Tab eventKey={VIEW_LINK_LIST} title={VIEW_LINK_LIST}>
                    <DisplayDocuments results={linkResults}
                        css={LINK_PAGE_TABLE_CSS}
                        title={LINK_TYPE}
                        config={getUserConfig(linkResults, onRowClick)}/>
                </Tab>}
                {tabControl.read && showDocument && !editDocument &&
                    <Tab eventKey={VIEW_CLICKED_LINK} title={VIEW_CLICKED_LINK}>
                        {Array.isArray(traverseDocument.previous) && <span className="col-md-1 ml-5">
                            <Button
                                className="btn-sm"
                                title={`Go to previous document ${traverseDocument.previous}`}
                                onClick={goToPreviousLinkedDocument}>
                                    <BiArrowBack className="mr-2"/>Back
                            </Button>
                        </span>}
                        {
                            traverseDocument && traverseDocument.hasOwnProperty("current") &&
                                <ViewDocument frames={frames}
                                    getDocumentToolBar={getDocumentToolBar}
                                    handleSelect={handleSelect}
                                    type={showDocument["@type"]}
                                    onTraverse={handleTraverse}
                                    showDocument={showDocument}
                                />
                        }
                        {
                            !traverseDocument &&
                            <ViewDocument frames={frames}
                                getDocumentToolBar={getDocumentToolBar}
                                handleSelect={handleSelect}
                                type={LINK_TYPE}
                                onTraverse={handleTraverse}
                                showDocument={showDocument}
                            />
                        }
                    </Tab>
                }
                {tabControl.write && editDocument && <Tab eventKey={EDIT_CLICKED_LINK} title={EDIT_CLICKED_LINK}>
                    <EditDocument frames={frames}
                        getDocumentToolBar={getDocumentToolBar}
                        handleSelect={handleSelect}
                        type={LINK_TYPE}
                        handleUpdate={handleUpdate}
                        editDocument={editDocument}/>
                    </Tab>
                }
                {tabControl.write && <Tab eventKey={CREATE_LINK_TAB} title={CREATE_LINK_TAB}>
                    {frames && <CreateDocument frames={frames}
                        handleSelect={handleSelect}
                        type={LINK_TYPE}
                        formData={extracted}
                        handleSubmit={handleDocumentSubmit}/>}
                </Tab>}
            </Tabs>

            <Alerts successMsg={successMsg}/>
            <Alerts errorMsg={errorMsg}/>
        </div>}

    </div>

}