import {useEffect, useState} from 'react'

export function QueryHook(woqlClient, query, setLoading, setSuccessMsg, setErrorMsg) {
    const [result, setResult] = useState(false)
    function executeQuery(query) {
        setLoading(true)
        query.execute(woqlClient)
        .then((res) => {
            setResult(res)
            setLoading(false)
        })
        .catch((err) => {
            setErrorMsg(err.message)
        })
    }

    useEffect(() => {
        if (query) executeQuery(query)
    }, [query])

    return result.hasOwnProperty("bindings") ? result.bindings : []
}

