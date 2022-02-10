import {useEffect, useState} from 'react'
import {VIEW_CLICKED_USER, VIEW_USER_LIST} from "../pages/constants"

export function DocumentHook(woqlClient, document, handleRefresh, setLoading, setSuccessMsg, setErrorMsg) {
    const [result, setResult] = useState(false)

    async function addDocument() {
        try{
            setLoading(true)
            const res = await woqlClient.addDocument(document, null, woqlClient.db())
            setResult(res)
            handleRefresh(VIEW_USER_LIST)
            setSuccessMsg(`Successfully added`)
            setLoading(false)
        }
        catch(err){
           setErrorMsg(err.message)
       }
    }

    useEffect(() => {
        if (Object.keys(document).length) addDocument()
    }, [document])

    return result
}

export function GetDocumentListHook(woqlClient, type, refresh, setLoading, setSuccessMsg, setErrorMsg) {
    const [result, setResult] = useState(false)

    async function getDocumentLists() {
        try{
            let params={}
            params['type'] = type
            params['as_list'] = true
            setLoading(true)
            const res = await woqlClient.getDocument(params, woqlClient.db())
            setResult(res)
            setLoading(false)
            return res
        }
        catch(err){
           setErrorMsg(err.message)
       }
    }

    useEffect(() => {
        if (type) getDocumentLists()
    }, [type, refresh])

    return result
}

export function GetDocumentHook(woqlClient, documentId, setLoading, setSuccessMsg, setErrorMsg) {
    const [result, setResult] = useState(false)

    async function getDocument() {
        try{
            let params={}
            params['id']=documentId
            params['as_list']=false
            setLoading(true)
            const res = await woqlClient.getDocument(params, woqlClient.db())
            setResult(res)
            setLoading(false)
            return res
        }
        catch(err){
           setErrorMsg(err.message)
       }
    }

    useEffect(() => {
        if (documentId) getDocument()
    }, [documentId])

    return result
}

export function DeleteDocumentHook(woqlClient, documentId, handleRefresh, setLoading, setSuccessMsg, setErrorMsg) {
    const [result, setResult] = useState(false)

    async function deleteDocument() {
        try{
            let params={}
            params['id'] = documentId
            let commitMsg=`Deleting document ${documentId}`
            setLoading(true)
            const res = await woqlClient.deleteDocument(params, woqlClient.db(), commitMsg)
            handleRefresh(VIEW_USER_LIST)
            setSuccessMsg(`Successfully deleted ${documentId}`)
            setLoading(false)
        }
        catch(err){
           setErrorMsg(err.message)
       }
    }

    useEffect(() => {
        if (documentId) deleteDocument()
    }, [documentId])

    return result
}

export function EditDocumentHook(woqlClient, extractedUpdate, handleRefresh, setDocumentId, setLoading, setSuccessMsg, setErrorMsg) {
    const [result, setResult] = useState(false)

    async function updateDocument() {
        try{

            let params={}
            let update = extractedUpdate
            let documentId = extractedUpdate["@id"]
            let commitMsg=`Updating document ${documentId}`
            setLoading(true)
            const res = await woqlClient.updateDocument(update, params, woqlClient.db(), commitMsg)
            setDocumentId(documentId)
            handleRefresh(VIEW_CLICKED_USER)
            setSuccessMsg(`Successfully updated ${documentId}`)
            setLoading(false)
        }
        catch(err){
           setErrorMsg(err.message)
       }
    }

    useEffect(() => {
        if (extractedUpdate) updateDocument()
    }, [extractedUpdate])

    return result
}


