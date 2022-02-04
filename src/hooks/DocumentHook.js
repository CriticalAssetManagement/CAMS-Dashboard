import {useEffect, useState} from 'react'

export function DocumentHook(woqlClient, document, setSuccessMsg, setErrorMsg) {
    const [result, setResult] = useState(false)

    async function addDocument() {
        try{
            const res = await woqlClient.addDocument(document, null, woqlClient.db())
            setResult(res)
            setSuccessMsg(`Successfully added`)
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

