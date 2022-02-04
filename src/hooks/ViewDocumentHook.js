import {useEffect, useState} from 'react'

export function ViewDocumentHook(woqlClient, documentID, setSuccessMsg, setErrorMsg) {
    const [result, setResult] = useState(false)

    async function getDocument() {
        try{

            let params={}
            params['id'] = documentID
            params['as_list'] = false
            const res = await woqlClient.getDocument(params, woqlClient.db())
            setResult(res)
            setSuccessMsg(`Successfully fetched ${documentID}`)
        }
        catch(err){
           setErrorMsg(err.message)
       }
    }

    useEffect(() => {
        if (documentID) getDocument()
    }, [documentID])

    return result
}

