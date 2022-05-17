import React, {useEffect} from "react"
import {Layout} from "../components/Layout"
import {ProgressBar, Button} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {USER_TYPE, USER_PAGE_TABLE_CSS, EDIT_CLICKED_USER, CREATE_USER_TAB, VIEW_USER_LIST, VIEW_CLICKED_USER} from "./constants"
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

export const UserForm = () => {

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
        handleTraverse,
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
        type,
        traverseDocument,
        goToPreviousLinkedDocument
    } = DocumentContextObj()

    const {
        isAuthenticated
    } = useAuth0()


    // create
    let result=DocumentHook(woqlClient, extracted, VIEW_USER_LIST, handleRefresh, setLoading, setSuccessMsg, setErrorMsg)
    //view all document
    let userResults=GetDocumentListHook(woqlClient, type, refresh, setLoading, setSuccessMsg, setErrorMsg)
    //get a document
    let documentResults=GetDocumentHook(woqlClient, documentId, setLoading, setSuccessMsg, setErrorMsg)
    // delete a document
    let deleteResult=DeleteDocumentHook(woqlClient, deleteDocument, VIEW_USER_LIST,handleRefresh, setLoading, setSuccessMsg, setErrorMsg)
    // edit a document
    let editResult=EditDocumentHook(woqlClient, extractedUpdate, VIEW_USER_LIST, handleRefresh, setDocumentId, setLoading, setSuccessMsg, setErrorMsg)


    useEffect(() => {
        // on changing tabs
        managePageTabs()
    }, [tabKey])


    useEffect(() => {
        setType(USER_TYPE)
    }, []) // refresh user Results list on reload or change of tabs


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
                <Tab eventKey={VIEW_USER_LIST} title={VIEW_USER_LIST}>
                    <DisplayDocuments results={userResults}
                        css={USER_PAGE_TABLE_CSS}
                        title={USER_TYPE}
                        config={getUserConfig(userResults, onRowClick)}/>
                </Tab>
                {showDocument && !editDocument && <Tab eventKey={VIEW_CLICKED_USER} title={VIEW_CLICKED_USER}>
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
                                type={USER_TYPE}
                                onTraverse={handleTraverse}
                                showDocument={showDocument}
                            />
                    }
                    </Tab>
                }
                {editDocument && <Tab eventKey={EDIT_CLICKED_USER} title={EDIT_CLICKED_USER}>
                    <EditDocument frames={frames}
                        getDocumentToolBar={getDocumentToolBar}
                        handleSelect={handleSelect}
                        type={USER_TYPE}
                        handleUpdate={handleUpdate}
                        editDocument={editDocument}/>
                    </Tab>
                }
                <Tab eventKey={CREATE_USER_TAB} title={CREATE_USER_TAB}>
                    {frames && <CreateDocument frames={frames}
                        handleSelect={handleSelect}
                        type={USER_TYPE}
                        handleSubmit={handleDocumentSubmit}/>}
                </Tab>
            </Tabs>

            <Alerts successMsg={successMsg}/>
            <Alerts errorMsg={errorMsg}/>
        </div>}

    </div>

}