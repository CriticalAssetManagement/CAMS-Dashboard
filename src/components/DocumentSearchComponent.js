import React,{useEffect} from "react"
import {useTDBDocuments,DocumentsGraphqlTable} from "@terminusdb/terminusdb-documents-ui-template"
import {gql} from "@apollo/client"
import {WOQLClientObj} from '../init-woql-client'

/**
 * 
 * @param {*} setSelected function to get selected document link by user 
 * @param {*} doctype document type selected
 * @returns 
 */
export const DocumentSearchComponent = ({setSelected, doctype}) => {
    const {apolloClient,woqlClient} = WOQLClientObj()
    const {documentTablesConfig,getGraphqlTablesConfig} = useTDBDocuments(woqlClient)

    useEffect(() => {
        if(doctype){       
            getGraphqlTablesConfig()         
        }
     },[doctype]);

    const querystr  = documentTablesConfig && documentTablesConfig.objQuery ? documentTablesConfig.objQuery[doctype].query : null
    const gqlQuery = querystr ? gql`${querystr}` : null
    if(!gqlQuery) return <div/>

    return  <DocumentsGraphqlTable tableConfig={documentTablesConfig} 
                type={doctype} 
                gqlQuery={gqlQuery}
                apolloClient={apolloClient}
                onRowClick={setSelected} 
                showGraphqlTab={false} />

}