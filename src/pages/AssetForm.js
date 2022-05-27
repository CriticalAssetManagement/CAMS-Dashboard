import React, {useEffect, useState} from "react"
import {Layout} from "../components/Layout"
import {ProgressBar, Button} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {ASSET_TYPE, ASSET_PAGE_TABLE_CSS, EDIT_CLICKED_ASSET, CREATE_ASSET_TAB, VIEW_ASSET_LIST, VIEW_CLICKED_ASSET} from "./constants"
import {Alerts} from "../components/Alerts"
import {DocumentHook, GetDocumentListHook, GetDocumentHook, DeleteDocumentHook, EditDocumentHook} from "../hooks/DocumentHook"
import {getAssetConfig} from "../components/Views"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {DocumentContextObj} from "../hooks/DocumentContextProvider"
import {DisplayDocuments, ViewDocument, CreateDocument, EditDocument} from "../components/Display"
import {BiArrowBack} from "react-icons/bi"
import { useAuth0 } from "@auth0/auth0-react"
import {Login} from "./Login"
import {renderDates} from "../components/utils"

export const AssetForm = () => {

    const {
		connectionError,
        frames,
        prefix,
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
    let result=DocumentHook(woqlClient, extracted, VIEW_ASSET_LIST, handleRefresh, setLoading, setSuccessMsg, setErrorMsg)
    //view all document
    let assetResults=GetDocumentListHook(woqlClient, type, refresh, setLoading, setSuccessMsg, setErrorMsg)
    //get a document
    let documentResults=GetDocumentHook(woqlClient, documentId, setLoading, setSuccessMsg, setErrorMsg)
    // delete a document
    let deleteResult=DeleteDocumentHook(woqlClient, deleteDocument, VIEW_ASSET_LIST, handleRefresh, setLoading, setSuccessMsg, setErrorMsg)
    // edit a document
    let editResult=EditDocumentHook(woqlClient, extractedUpdate, VIEW_ASSET_LIST, handleRefresh, setDocumentId, setLoading, setSuccessMsg, setErrorMsg)


    useEffect(() => {
        // on changing tabs
        managePageTabs()
    }, [tabKey])

    useEffect(() => {
        setType(ASSET_TYPE)
    }, []) // refresh asset Results list on reload or change of tabs

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
                onSelect={(k) => setTabKey(k)}
                className="mb-3">
                {tabControl.read && <Tab eventKey={VIEW_ASSET_LIST} title={VIEW_ASSET_LIST}>
                    <DisplayDocuments results={assetResults}
                        css={ASSET_PAGE_TABLE_CSS}
                        config={getAssetConfig(assetResults, onRowClick, renderDates)}
                        title={ASSET_TYPE}
                        onRowClick={onRowClick}/>
                </Tab>}
                {tabControl.read && showDocument && !editDocument && <Tab eventKey={VIEW_CLICKED_ASSET} title={VIEW_CLICKED_ASSET}>

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
                        {!traverseDocument &&
                            <ViewDocument frames={frames}
                                getDocumentToolBar={getDocumentToolBar}
                                handleSelect={handleSelect}
                                type={ASSET_TYPE}
                                onTraverse={handleTraverse}
                                showDocument={showDocument}
                            />
                        }
                    </Tab>
                }
                {tabControl.write && editDocument && <Tab eventKey={EDIT_CLICKED_ASSET} title={EDIT_CLICKED_ASSET}>
                    <EditDocument frames={frames}
                        getDocumentToolBar={getDocumentToolBar}
                        handleSelect={handleSelect}
                        type={ASSET_TYPE}
                        handleUpdate={handleUpdate}
                        editDocument={editDocument}/>
                    </Tab>
                }
                {tabControl.write && <Tab eventKey={CREATE_ASSET_TAB} title={CREATE_ASSET_TAB}>
                    {frames && <CreateDocument frames={frames}
                        handleSelect={handleSelect}
                        type={ASSET_TYPE} 
                        formData={extracted}
                        handleSubmit={handleDocumentSubmit}/>}
                </Tab>}
            </Tabs>

            <Alerts successMsg={successMsg}/>
            <Alerts errorMsg={errorMsg}/>
        </div>}

    </div>

}