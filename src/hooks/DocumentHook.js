import {useEffect, useState} from 'react'

// create a new document
export function DocumentHook(woqlClient, document, onRefreshTab, handleRefresh, setLoading, setSuccessMsg, setErrorMsg, language) {
    const [result, setResult] = useState(false)
 
    async function addDocument() {
        try{
            setLoading(true)
            const res = await woqlClient.addDocument(document, null, woqlClient.db())
            setResult(res)
            handleRefresh(onRefreshTab)
            setSuccessMsg(`${language.SUCCESS_CREATE}`)
            setLoading(false)
        }
        catch(err){ 
            setLoading(false)
           setErrorMsg(err.message)
       }
    }

    useEffect(() => {
        if (Object.keys(document).length) addDocument()
    }, [document])

    return result
}

// view document type instances
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
            setLoading(false)
            setErrorMsg(err.message)
       }
    }

    useEffect(() => {
        if (type && woqlClient) getDocumentLists()
    }, [type, refresh, woqlClient])

    return result
}

// view a document
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
            setLoading(false)
           setErrorMsg(err.message)
       }
    }

    useEffect(() => {
        if (documentId) getDocument()
    }, [documentId])

    return result
}

// delete documents
export function DeleteDocumentHook(woqlClient, documentId, onRefreshTab, handleRefresh, setLoading, setSuccessMsg, setErrorMsg, language) {
    const [result, setResult] = useState(false)

    async function deleteDocument() {
        try{
            let params={}
            params['id'] = documentId
            let commitMsg=`Deleting document ${documentId}` 
            setLoading(true)
            const res = await woqlClient.deleteDocument(params, woqlClient.db(), commitMsg)
            handleRefresh(onRefreshTab)
            setSuccessMsg(`${language.SUCCESS_DELETE} ${documentId}`)
            setLoading(false)
        }
        catch(err){
           setErrorMsg(err.message)
           setLoading(false)
       }
    }

    useEffect(() => {
        if (documentId) deleteDocument()
    }, [documentId])

    return result
}


// edit documents
export function EditDocumentHook(woqlClient, extractedUpdate, onRefreshTab, handleRefresh, setDocumentId, setLoading, setSuccessMsg, setErrorMsg) {
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
            handleRefresh(onRefreshTab)
            setSuccessMsg(`Successfully updated ${documentId}`)
            setLoading(false)
        }
        catch(err){
           setErrorMsg(err.message)
           setLoading(false)
       }
    }

    useEffect(() => {
        if (extractedUpdate) updateDocument()
    }, [extractedUpdate])

    return result
}




