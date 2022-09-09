import React, {useEffect,useState} from "react"
import {Layout} from "../components/Layout"
import {ProgressBar} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {AREA_TYPE, AREA_PAGE_TABLE_CSS} from "./constants"
import {Alerts} from "../components/Alerts"
import {DocumentHook, GetDocumentListHook, GetDocumentHook, DeleteDocumentHook, EditDocumentHook} from "../hooks/DocumentHook"
import {getAreaConfig} from "../components/Views"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {DocumentContextObj} from "../hooks/DocumentContextProvider"
import {DisplayDocuments, ViewDocument, CreateDocument, EditDocument} from "../components/Display"


export const AreaForm = () => {

    const {
      frames,
        woqlClient,
        refresh,
        language
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

    const [loading,setLoading] = useState(false)
    const [successMsg,setSuccessMsg] = useState(false)
    const [errorMsg,setErrorMsg] = useState(false)


    // create
    let result=DocumentHook(woqlClient, extracted, language.VIEW_AREA_LIST,handleRefresh, setLoading, setSuccessMsg, setErrorMsg)
    //view all document
    //get a document
    let documentResults=GetDocumentHook(woqlClient, documentId, setLoading, setSuccessMsg, setErrorMsg)
    // delete a document
    let deleteResult=DeleteDocumentHook(woqlClient, deleteDocument, language.VIEW_AREA_LIST, handleRefresh, setLoading, setSuccessMsg, setErrorMsg)
    // edit a document
    let editResult=EditDocumentHook(woqlClient, extractedUpdate, language.VIEW_CLICKED_AREA, handleRefresh, setDocumentId, setLoading, setSuccessMsg, setErrorMsg)


    useEffect(() => {
        // on changing tabs
        managePageTabs(setSuccessMsg,setErrorMsg)
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

    return <div className="mb-5">
        <Layout/>
        <div className="px-3 content-container">
            {loading && <ProgressBar animated now={100} variant="info"/>}
            <Tabs id="controlled-tab"
                activeKey={tabKey}
                onSelect={(k) => setTabKey(k)}
                className="mb-3">
                <Tab eventKey={language.VIEW_AREA_LIST} title={language.VIEW_AREA_LIST}>
                    <DisplayDocuments results={areaResults}
                        css={AREA_PAGE_TABLE_CSS}
                        config={getAreaConfig(areaResults, onRowClick)}
                        type={AREA_TYPE}
                        onRowClick={onRowClick}/>
                </Tab>
                {showDocument && !editDocument && <Tab eventKey={language.VIEW_CLICKED_AREA} title={language.VIEW_CLICKED_AREA}>

                        <ViewDocument frames={frames}
                            getDocumentToolBar={getDocumentToolBar}
                            handleSelect={handleSelect}
                            type={AREA_TYPE}
                            showDocument={showDocument}/>
                    </Tab>
                }
                {editDocument && <Tab eventKey={language.EDIT_CLICKED_AREA} title={language.EDIT_CLICKED_AREA}>
                    <EditDocument frames={frames}
                        getDocumentToolBar={getDocumentToolBar}
                        handleSelect={handleSelect}
                        type={AREA_TYPE}
                        handleUpdate={handleUpdate}
                        editDocument={editDocument}/>
                    </Tab>
                }
                <Tab eventKey={language.CREATE_AREA_TAB} title={language.CREATE_AREA_TAB}>
                    {frames && <CreateDocument frames={frames}
                        handleSelect={handleSelect}
                        type={AREA_TYPE}
                        formData={extracted}
                        handleSubmit={handleDocumentSubmit}/>}
                </Tab>
            </Tabs>

            <Alerts successMsg={successMsg}/>
            <Alerts errorMsg={errorMsg}/>
        </div>

    </div>

}