import React, {useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {NEW_DOC,EDIT_DOC} from "./constants"
import {gql} from "@apollo/client";
import {ListDocumentsComponent,useTDBDocuments } from "@terminusdb/terminusdb-documents-ui-template";
//import {ClientObj} from '../dashboard-context'
import { Alert, ProgressBar } from "react-bootstrap";
import {WOQLClientObj} from '../init-woql-client'

// I pass this so I'm sure it exists before loading the component
export const ListDocuments = () => {    
    const {type} = useParams()
    const {apolloClient,woqlClient} = WOQLClientObj()
    const {deleteDocument,
        loading,
        error,
        getGraphqlTablesConfig,
        documentTablesConfig,
        setError} = useTDBDocuments(woqlClient)
    
    const navigate = useNavigate()
    
    useEffect(() => {
        getGraphqlTablesConfig()
    },[woqlClient])

    async function callDeleteDocument(row){
        var answer = window.confirm("Are you sure you want to delete this document");
        if (answer) {
            let fullId = row['id']
            const delCall = await deleteDocument(fullId)
            if(delCall){
                navigate(-1)
            }
        } 
    }

    const onViewClick = (row) =>{
        let fullId = row['id']
        let fullIdEncode = btoa(fullId)
        navigate(fullIdEncode)
    }

    const onEditClick = (row) =>{
        let fullId = row['id']
        let fullIdEncode = btoa(fullId)
        //navigate(`${fullIdEncode}/${EDIT_DOC}`)
    }

    function handleCreate(e) {
        //navigate(`${NEW_DOC}`)
    }

    if(loading) return <ProgressBar animated now={100} label={`Fetching ${type} ...`}/>
    
    const querystr  = documentTablesConfig ? documentTablesConfig.objQuery[type].query : null
    const query = querystr ? gql`${querystr}` : false
    const tableConfig =  documentTablesConfig && documentTablesConfig.tablesColumnsConfig ? documentTablesConfig.tablesColumnsConfig[type] : []
    const advancedSearchConfig = documentTablesConfig && documentTablesConfig.advancedSearchObj ? documentTablesConfig.advancedSearchObj[type] : null
 
    const errorMessage = typeof error === "object" ? JSON.stringify(error,null,4) : error

    return  <React.Fragment>
             {error && <Alert variant="danger" className="m-5" onClose={() => setError(false)} dismissible>
                Server Error: {errorMessage} </Alert>}
            {query && tableConfig &&
            <ListDocumentsComponent type={type}
                gqlQuery={query} 
                apolloClient={apolloClient} 
                tableConfig={tableConfig} 
                advancedSearchConfig={advancedSearchConfig}
                onRowClick={onViewClick} 
                onViewButtonClick={onViewClick}
                onEditButtonClick={onEditClick}
                onDeleteButtonClick={callDeleteDocument}
                onCreateButtonClick={handleCreate}/>}
            </React.Fragment> 
}