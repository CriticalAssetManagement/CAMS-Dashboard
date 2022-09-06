import React, {useEffect} from "react"
import {Layout} from "../components/Layout"
import {ProgressBar, Button} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {USER_TYPE, USER_PAGE_TABLE_CSS} from "./constants"
import {Alerts} from "../components/Alerts"
import {DocumentHook, GetDocumentListHook, GetDocumentHook, DeleteDocumentHook, EditDocumentHook} from "../hooks/DocumentHook"
import {getUserConfig} from "../components/Views"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {DocumentContextObj} from "../hooks/DocumentContextProvider"
import {DisplayDocuments, ViewDocument, CreateDocument, EditDocument} from "../components/Display"
import {BiArrowBack} from "react-icons/bi"
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
        setRefresh,
        language,
        clientUser
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
        goToPreviousLinkedDocument,
        tabControl
    } = DocumentContextObj()


    const {
        isAuthenticated
    } = clientUser

    // create
    let result=DocumentHook(woqlClient, extracted, language.VIEW_USER_LIST, handleRefresh, setLoading, setSuccessMsg, setErrorMsg, language)
    //view all document
    let userResults=GetDocumentListHook(woqlClient, type, refresh, setLoading, setSuccessMsg, setErrorMsg)
    //get a document
    let documentResults=GetDocumentHook(woqlClient, documentId, setLoading, setSuccessMsg, setErrorMsg)
    // delete a document
    let deleteResult=DeleteDocumentHook(woqlClient, deleteDocument, language.VIEW_USER_LIST,handleRefresh, setLoading, setSuccessMsg, setErrorMsg, language)
    // edit a document
    let editResult=EditDocumentHook(woqlClient, extractedUpdate, language.VIEW_USER_LIST, handleRefresh, setDocumentId, setLoading, setSuccessMsg, setErrorMsg)


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
                {tabControl.read && <Tab eventKey={language.VIEW_USER_LIST} title={language.VIEW_USER_LIST}>
                    <DisplayDocuments results={userResults}
                        css={USER_PAGE_TABLE_CSS}
                        type={USER_TYPE}
                        csvConfig={language.PERSON_CSV_CONFIG}
                        config={getUserConfig(userResults, onRowClick, frames)}/>
                </Tab>}
                {tabControl.read && showDocument && !editDocument && <Tab eventKey={language.VIEW_CLICKED_USER} title={language.VIEW_CLICKED_USER}>
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
                {tabControl.write && editDocument && <Tab eventKey={language.EDIT_CLICKED_USER} title={language.EDIT_CLICKED_USER}>
                    <EditDocument frames={frames}
                        getDocumentToolBar={getDocumentToolBar}
                        handleSelect={handleSelect}
                        type={USER_TYPE}
                        handleUpdate={handleUpdate}
                        editDocument={editDocument}/>
                    </Tab>
                }
                {tabControl.write && <Tab eventKey={language.CREATE_USER_TAB} title={language.CREATE_USER_TAB}>
                    {frames && <CreateDocument frames={frames}
                        handleSelect={handleSelect}
                        type={USER_TYPE}
                        formData={extracted}
                        handleSubmit={handleDocumentSubmit}/>}
                </Tab>}

            </Tabs>

            <Alerts successMsg={successMsg}/>
            <Alerts errorMsg={errorMsg}/>
        </div>}

    </div>

}