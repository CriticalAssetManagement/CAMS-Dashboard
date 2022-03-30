import {useEffect, useState} from 'react'

export function executeQuery(woqlClient, query, setResult, setLoading, setErrorMsg) {
    if(setLoading) setLoading(true)
    query.execute(woqlClient)
    .then((res) => {
        if(setResult) setResult(res)
        if(setLoading) setLoading(false)
        return res
    })
    .catch((err) => {
        if(setErrorMsg) setErrorMsg(err.message)
    })
}

export function QueryHook(woqlClient, query, setLoading, setSuccessMsg, setErrorMsg) {
    const [result, setResult] = useState(false)

    useEffect(() => {
        if (query) executeQuery(woqlClient, query, setResult, setLoading, setErrorMsg)
    }, [query])

    return result.hasOwnProperty("bindings") ? result.bindings : []
}

