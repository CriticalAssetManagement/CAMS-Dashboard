import React, {useState, useEffect, useContext} from 'react'
export const DocumentContext = React.createContext()
export const DocumentContextObj = () => useContext(DocumentContext)
import {VIEW_CLICKED_USER, VIEW_USER_LIST , CREATE_USER_TAB, USER_TYPE, EDIT_CLICKED_USER} from "../pages/constants"
import {handleDocumentSelect} from "../components/utils"
import {WOQLClientObj} from '../init-woql-client'
import {Button, Row} from "react-bootstrap"
import {VARIANT} from '../components/constants'

export const DocumentContextProvider = ({children, params}) => {
    const [documentId, setDocumentId] = useState(false) // view a document
    const [extracted, setExtracted] = useState(false) //create document
    const [deleteDocument, setDeleteDocument] = useState(false) //delete document
    const [editDocument, setEditDocument] = useState(false) //edit document
    const [extractedUpdate, setExtractedUpdate] = useState(false)
    const [tabKey, setTabKey] = useState(VIEW_USER_LIST)
    const [showDocument, setShowDocument] = useState(false)

    const {
        setSuccessMsg,
        setErrorMsg,
        woqlClient,
        clearMessages,
        setRefresh
	} = WOQLClientObj()

    // on click of row in WOQLTable
    function onRowClick(row) {
        if(row.hasOwnProperty("values") && row.values.hasOwnProperty("@id")) {
            setDocumentId(row.values["@id"])
            setTabKey(VIEW_CLICKED_USER)
        }
    }

    // refresh user list after delete or create of a document
    function handleRefresh(tab) {
        setTabKey(tab) //set to tab
        setEditDocument(false)
        setExtractedUpdate(false)
        setDeleteDocument(false)
        setRefresh(Date.now())
    }


    // rendering function to create delete button
    function getDeleteButton(document) {
        return <Button className="btn-sm"
            variant="danger"
            title={`Delete ${document["@id"]}`}
            onClick={(e) => setDeleteDocument(document["@id"])}>
            Delete
        </Button>
    }

    // rendering function to create delete button
    function getEditButton(document) {
        function handleEdit (document) {
            setEditDocument(document)
            //setShowDocument(false)
            setTabKey(EDIT_CLICKED_USER)
        }
        return <Button className="btn-sm mr-1"
            variant={VARIANT}
            title={`Edit ${document}`}
            onClick={(e) => handleEdit(document)}>
            Edit
        </Button>
    }

    function getDocumentToolBar(document) {
       return <span className="toolbar-right">
           {getEditButton(document)}
           {getDeleteButton(document)}
       </span>
    }

    // clear clicked document to view
    function clearClickedDocument() {
        //hide clicked document info
        setDocumentId(false)
        setShowDocument(false)
    }

    // function to handle User Submit
    function handleUserSubmit(data) {
        if(!data.hasOwnProperty("@type")) data["@type"] = USER_TYPE
        clearMessages()
        setExtracted(data)
    }

    // function to handle User Update
    function handleUpdate(data) {
        if(!data.hasOwnProperty("@id")) data["@id"] = editDocument["@id"]
        if(!data.hasOwnProperty("@type")) data["@type"] = USER_TYPE
        clearMessages()
        setExtractedUpdate(data)
    }

    // function to handle select search
    function handleSelect(inp, type) {
        if(!inp) return
        return handleDocumentSelect(woqlClient, inp, type)
    }

    //function to manage user page tabs
    function manageUserTabs() {
        if(tabKey === VIEW_USER_LIST) {
            //setRefresh(Date.now())
            clearClickedDocument()
        }
        else if(tabKey === CREATE_USER_TAB) {
            clearClickedDocument()
        }
        setSuccessMsg(false)
        setErrorMsg(false)
    }


    return (
        <DocumentContext.Provider
            value={{
                onRowClick,
                documentId,
                setDocumentId,
                tabKey,
                setTabKey,
                showDocument,
                setShowDocument,
                manageUserTabs,
                handleUserSubmit,
                extracted,
                setExtracted,
                handleSelect,
                getDeleteButton,
                deleteDocument,
                setDeleteDocument,
                getDocumentToolBar,
                handleRefresh,
                editDocument,
                handleUpdate,
                extractedUpdate,
                setExtractedUpdate
            }}
        >
            {children}
        </DocumentContext.Provider>
    )
}
