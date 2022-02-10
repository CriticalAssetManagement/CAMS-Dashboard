import React, {useEffect} from "react"
import {Layout} from "../components/Layout"
import {Container, Row, ProgressBar} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {Form} from "../components/Form"
import {USER_TYPE, CREATE_MODE, VIEW_MODE, EDIT_MODE, USER_PAGE_TABLE_CSS, EDIT_CLICKED_USER, CREATE_USER_TAB, VIEW_USER_LIST, VIEW_CLICKED_USER} from "./constants"
import {Alerts} from "../components/Alerts"
import {DocumentHook, GetDocumentListHook, GetDocumentHook, DeleteDocumentHook, EditDocumentHook} from "../hooks/DocumentHook"
import {Table} from "../components/Table"
import {getUserConfig} from "../components/Views"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {DocumentContextObj} from "../hooks/DocumentContextProvider"

const DisplayUsers = ({userResults, onRowClick}) => {
    return <Row className="text-break">
        <Table documents = {userResults}
            config={getUserConfig(userResults, onRowClick)}
            css={USER_PAGE_TABLE_CSS}/>
    </Row>
}

const ViewDocument = ({frames, getDocumentToolBar, handleSelect, showDocument}) => {
    return <React.Fragment>
        <Row>
            {getDocumentToolBar(showDocument)}
        </Row>
        <Row className="text-break">
            <Form frames={frames}
                type={USER_TYPE}
                mode={VIEW_MODE}
                hideSubmit={true}
                onSelect={handleSelect}
                formData={showDocument}
            />
        </Row>
    </React.Fragment>
}

const CreateUser = ({frames, handleSelect, handleUserSubmit}) => {
    return <Form frames={frames}
        type={USER_TYPE}
        mode={CREATE_MODE}
        onSubmit={handleUserSubmit}
        onSelect={handleSelect}
        formData={{}}
    />
}

const EditUser = ({frames, editDocument, getDocumentToolBar, handleUpdate, handleSelect}) => {

    return <React.Fragment>
        <Row>
            {getDocumentToolBar(editDocument)}
        </Row>
        <Row className="text-break">
            <Form frames={frames}
                type={USER_TYPE}
                mode={EDIT_MODE}
                onSubmit={handleUpdate}
                onSelect={handleSelect}
                formData={editDocument}
            />
        </Row>
    </React.Fragment>
}

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
	} = WOQLClientObj()

    const {
        onRowClick,
        documentId,
        tabKey,
        setTabKey,
        showDocument,
        setShowDocument,
        manageUserTabs,
        handleUserSubmit,
        extracted,
        handleSelect,
        deleteDocument,
        handleUpdate,
        getDocumentToolBar,
        handleRefresh,
        editDocument,
        extractedUpdate,
        setDocumentId
    } = DocumentContextObj()


    // create
    let result=DocumentHook(woqlClient, extracted, handleRefresh, setLoading, setSuccessMsg, setErrorMsg)
    //view all document
    let userResults=GetDocumentListHook(woqlClient, USER_TYPE, refresh, setLoading, setSuccessMsg, setErrorMsg)
    //get a document
    let documentResults=GetDocumentHook(woqlClient, documentId, setLoading, setSuccessMsg, setErrorMsg)
    // delete a document
    let deleteResult=DeleteDocumentHook(woqlClient, deleteDocument, handleRefresh, setLoading, setSuccessMsg, setErrorMsg)
    // edit a document
    let editResult=EditDocumentHook(woqlClient, extractedUpdate, handleRefresh, setDocumentId, setLoading, setSuccessMsg, setErrorMsg)


    useEffect(() => {
        // on changing tabs
        manageUserTabs()
    }, [tabKey])

    useEffect(() => {
        if(Object.keys(documentResults).length){
            // show view document tab only when a document is clicked
            setShowDocument(documentResults)
        }
    }, [documentResults])

    console.log("************************documentId", documentId)
    console.log("tabKey", tabKey)
    console.log("editDocument", editDocument)
    console.log("documentResults", documentResults)
    console.log("showDocument", showDocument)

    return <Container fluid="lg" className="mt-5 mb-5">
        <Layout/>
        <Alerts errorMsg={connectionError}/>
        {loading && <ProgressBar animated now={100} variant="info"/>}

        <Tabs id="controlled-tab"
            activeKey={tabKey}
            onSelect={(k) => setTabKey(k)}
            className="mb-3">
            <Tab eventKey={VIEW_USER_LIST} title={VIEW_USER_LIST}>
                <DisplayUsers userResults={userResults}
                    onRowClick={onRowClick}/>
            </Tab>
            {showDocument && !editDocument && <Tab eventKey={VIEW_CLICKED_USER} title={VIEW_CLICKED_USER}>
                    <ViewDocument frames={frames}
                        getDocumentToolBar={getDocumentToolBar}
                        handleSelect={handleSelect}
                        showDocument={showDocument}/>
                </Tab>
            }
            {editDocument && <Tab eventKey={EDIT_CLICKED_USER} title={EDIT_CLICKED_USER}>
                <EditUser frames={frames}
                    getDocumentToolBar={getDocumentToolBar}
                    handleSelect={handleSelect}
                    handleUpdate={handleUpdate}
                    editDocument={editDocument}/>
                </Tab>
            }
            <Tab eventKey={CREATE_USER_TAB} title={CREATE_USER_TAB}>
                {frames && <CreateUser frames={frames}
                    handleSelect={handleSelect}
                    handleUserSubmit={handleUserSubmit}/>}
            </Tab>
        </Tabs>

        <Alerts successMsg={successMsg}/>
        <Alerts errorMsg={errorMsg}/>
    </Container>

}