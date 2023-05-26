//This is use the NewDocumentComponent template to create a new document type
import React, {useEffect}  from "react";
import {useNavigate, useParams } from "react-router-dom";
//we import the NewDocumentComponent base from the terminusdb-documents-ui-template
//this component allow you to create in a easy way your application
import {NewDocumentComponent,useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"
import {DocumentSearchComponent} from "../components/DocumentSearchComponent"
//import {ClientObj} from '../dashboard-context'
import { Alert, ProgressBar } from "react-bootstrap"; 

import {WOQLClientObj} from '../init-woql-client'

export const DocumentNew = ( {type}) => {  
    //const {type} = useParams()
    const {woqlClient} = WOQLClientObj()
   
    const {
        frames,
        error,
        getDocumentFrames,
        createDocument,
        setError
    } = useTDBDocuments(woqlClient)

    const navigate = useNavigate()
  
    useEffect(() => {
        if(woqlClient){
            getDocumentFrames()
        }
	},[woqlClient])

    const callCreateDocument = async (jsonDocument) =>{
        const created = await createDocument(jsonDocument)
        if(created){
            navigate(`/${type}`)
        }
    }
 
    const closeButtonClick = () =>{
        navigate(-1)
    }

    if(!frames) return  <ProgressBar animated now={100} label={`Fetching frames for document type ${type} ...`}/>
    const errorMessage = typeof error === "object" ? JSON.stringify(error,null,4) : error
    
    return  <React.Fragment>
            {error && <Alert variant="danger" className="m-5" onClose={() => setError(false)} dismissible>
                Server Error: {errorMessage} </Alert>}
                <NewDocumentComponent
                    SearchComponent={DocumentSearchComponent}
                    frames={frames}
                    createDocument={callCreateDocument}
                    type={type}
                    closeButtonClick={closeButtonClick}
                />     
            </React.Fragment>
}