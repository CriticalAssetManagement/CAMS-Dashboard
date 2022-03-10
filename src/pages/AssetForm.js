import React, {useEffect} from "react"
import {Layout} from "../components/Layout"
import {ProgressBar} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {ASSET_TYPE, AREA_PAGE_TABLE_CSS, EDIT_CLICKED_ASSET, CREATE_ASSET_TAB, VIEW_ASSET_LIST, VIEW_CLICKED_ASSET} from "./constants"
import {Alerts} from "../components/Alerts"
import {DocumentHook, GetDocumentListHook, GetDocumentHook, DeleteDocumentHook, EditDocumentHook} from "../hooks/DocumentHook"
import {getAssetConfig} from "../components/Views"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {DocumentContextObj} from "../hooks/DocumentContextProvider"
import {DisplayDocuments, ViewDocument, CreateDocument, EditDocument} from "../components/Display"


export const AssetForm = () => {

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
    let result=DocumentHook(woqlClient, extracted, VIEW_ASSET_LIST, handleRefresh, setLoading, setSuccessMsg, setErrorMsg)
    //view all document
    let assetResults=GetDocumentListHook(woqlClient, type, refresh, setLoading, setSuccessMsg, setErrorMsg)
    //get a document
    let documentResults=GetDocumentHook(woqlClient, documentId, setLoading, setSuccessMsg, setErrorMsg)
    // delete a document
    let deleteResult=DeleteDocumentHook(woqlClient, deleteDocument, VIEW_ASSET_LIST, handleRefresh, setLoading, setSuccessMsg, setErrorMsg)
    // edit a document
    let editResult=EditDocumentHook(woqlClient, extractedUpdate, VIEW_CLICKED_ASSET, handleRefresh, setDocumentId, setLoading, setSuccessMsg, setErrorMsg)


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

        <div className="px-3">
            <Alerts errorMsg={connectionError}/>
            {loading && <ProgressBar animated now={100} variant="info"/>}

            <Tabs id="controlled-tab"
                activeKey={tabKey}
                onSelect={(k) => setTabKey(k)}
                className="mb-3">
                <Tab eventKey={VIEW_ASSET_LIST} title={VIEW_ASSET_LIST}>
                    <DisplayDocuments results={assetResults}
                        css={AREA_PAGE_TABLE_CSS}
                        config={getAssetConfig(assetResults, onRowClick)}
                        title={ASSET_TYPE}
                        onRowClick={onRowClick}/>
                </Tab>
                {showDocument && !editDocument && <Tab eventKey={VIEW_CLICKED_ASSET} title={VIEW_CLICKED_ASSET}>

                        <ViewDocument frames={frames}
                            getDocumentToolBar={getDocumentToolBar}
                            handleSelect={handleSelect}
                            type={ASSET_TYPE}
                            showDocument={showDocument}/>
                    </Tab>
                }
                {editDocument && <Tab eventKey={EDIT_CLICKED_ASSET} title={EDIT_CLICKED_ASSET}>
                    <EditDocument frames={frames}
                        getDocumentToolBar={getDocumentToolBar}
                        handleSelect={handleSelect}
                        type={ASSET_TYPE}
                        handleUpdate={handleUpdate}
                        editDocument={editDocument}/>
                    </Tab>
                }
                <Tab eventKey={CREATE_ASSET_TAB} title={CREATE_ASSET_TAB}>
                    {frames && <CreateDocument frames={frames}
                        handleSelect={handleSelect}
                        type={ASSET_TYPE}
                        handleSubmit={handleDocumentSubmit}/>}
                </Tab>
            </Tabs>

            <Alerts successMsg={successMsg}/>
            <Alerts errorMsg={errorMsg}/>
        </div>

    </div>

}