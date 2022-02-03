import React from "react"
import {DATA_PRODUCT} from "../constants"

export async function addDocument (woqlClient, document, setSuccessMsg, setErrorMsg) {
    try{
         const result = await woqlClient.addDocument(document, null, DATA_PRODUCT)
         console.log("result", result)
         setSuccessMsg(`Successfully added`)
    }catch(err){
        setErrorMsg(err.message)
    }
}