import {useEffect, useState} from 'react'

export function DocumentHook(woqlClient, document, setLoading, setSuccessMsg, setErrorMsg) {
    const [result, setResult] = useState(false)

    async function addDocument() {
        try{
            setLoading(true)
            const res = await woqlClient.addDocument(document, null, woqlClient.db())
            setResult(res)
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



