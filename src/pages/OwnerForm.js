import React, {useEffect} from "react"
import {Layout} from "../components/Layout"
import {ProgressBar, Button} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {OWNER_TYPE, OWNER_PAGE_TABLE_CSS, EDIT_CLICKED_OWNER, CREATE_OWNER_TAB, VIEW_OWNER_LIST, VIEW_CLICKED_OWNER} from "./constants"
import {Alerts} from "../components/Alerts"
import {DocumentHook, GetDocumentListHook, GetDocumentHook, DeleteDocumentHook, EditDocumentHook} from "../hooks/DocumentHook"
import {getOwnerConfig} from "../components/Views"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {DocumentContextObj} from "../hooks/DocumentContextProvider"
import {DisplayDocuments, ViewDocument, CreateDocument, EditDocument} from "../components/Display"
import {BiArrowBack} from "react-icons/bi"
import { useAuth0 } from "@auth0/auth0-react"
import {Login} from "./Login"

export const OwnerForm = () => {

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
        handleTraverse,
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
        type,
        traverseDocument,
        goToPreviousLinkedDocument
    } = DocumentContextObj()

    const {
        isAuthenticated
    } = useAuth0()

    // create
    let result=DocumentHook(woqlClient, extracted, VIEW_OWNER_LIST, handleRefresh, setLoading, setSuccessMsg, setErrorMsg)
    //view all document
    let ownerResults=GetDocumentListHook(woqlClient, type, refresh, setLoading, setSuccessMsg, setErrorMsg)
    //get a document
    let documentResults=GetDocumentHook(woqlClient, documentId, setLoading, setSuccessMsg, setErrorMsg)
    // delete a document
    let deleteResult=DeleteDocumentHook(woqlClient, deleteDocument, VIEW_OWNER_LIST,handleRefresh, setLoading, setSuccessMsg, setErrorMsg)
    // edit a document
    let editResult=EditDocumentHook(woqlClient, extractedUpdate, VIEW_CLICKED_OWNER, handleRefresh, setDocumentId, setLoading, setSuccessMsg, setErrorMsg)


    useEffect(() => {
        // on changing tabs
        managePageTabs()
    }, [tabKey])


    useEffect(() => {
        setType(OWNER_TYPE)
    }, []) // refresh owner Results list on reload or change of tabs


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
                <Tab eventKey={VIEW_OWNER_LIST} title={VIEW_OWNER_LIST}>
                    <DisplayDocuments results={ownerResults}
                        css={OWNER_PAGE_TABLE_CSS}
                        title={OWNER_TYPE}
                        config={getOwnerConfig(ownerResults, onRowClick)}/>
                </Tab>
                {showDocument && !editDocument && <Tab eventKey={VIEW_CLICKED_OWNER} title={VIEW_CLICKED_OWNER}>
                    {Array.isArray(traverseDocument.previous) &&
                        <span className="col-md-1 ml-5">
                            <Button
                                className="btn-sm"
                                title={`Go to previous document ${traverseDocument.previous}`}
                                onClick={goToPreviousLinkedDocument}>
                                    <BiArrowBack className="mr-2"/>Back
                            </Button>
                        </span>
                    }
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
                                onTraverse={handleTraverse}
                                type={OWNER_TYPE}
                                showDocument={showDocument}
                            />
                    }
                    </Tab>
                }
                {editDocument && <Tab eventKey={EDIT_CLICKED_OWNER} title={EDIT_CLICKED_OWNER}>
                    <EditDocument frames={frames}
                        getDocumentToolBar={getDocumentToolBar}
                        handleSelect={handleSelect}
                        type={OWNER_TYPE}
                        handleUpdate={handleUpdate}
                        editDocument={editDocument}/>
                    </Tab>
                }
                <Tab eventKey={CREATE_OWNER_TAB} title={CREATE_OWNER_TAB}>
                    {frames && <CreateDocument frames={frames}
                        handleSelect={handleSelect}
                        type={OWNER_TYPE}
                        handleSubmit={handleDocumentSubmit}/>}
                </Tab>
            </Tabs>

            <Alerts successMsg={successMsg}/>
            <Alerts errorMsg={errorMsg}/>
        </div>}

    </div>

}