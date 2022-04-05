import React, {useState, useEffect, useContext} from 'react'
const TerminusDBClient = require("@terminusdb/terminusdb-client")
import {extractPrefix} from "@terminusdb/terminusdb-documents-ui"
export const WOQLContext = React.createContext()
export const WOQLClientObj = () => useContext(WOQLContext)
import {DATA_PRODUCT} from "./constants"
import {HOME_PAGE} from './routing/constants'

export const WOQLClientProvider = ({children, params}) => {

    let team = process.env.MY_TEAM
    let token = process.env.MY_TOKEN
    let user = process.env.MY_USER
    let server = process.env.TERMINUSDB_SERVER

    const [woqlClient, setWoqlClient] = useState(false)
    const [connectionError, setConnectionError] = useState(false)
    const [page, setPage] = useState(HOME_PAGE)
    const [frames, setFrames] = useState(false)
    const [prefix, setPrefix] = useState(false)

    const [loading, setLoading]=useState(true)
    const [refresh, setRefresh]=useState(false)
    const [successMsg, setSuccessMsg] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)

    const client = new TerminusDBClient.WOQLClient(`${server}${team}/`, {
        user: user,
        organization: team
    })

    /* Initialize client */
    useEffect(() => {
        try{
            client.setApiKey(token)
            client.db(DATA_PRODUCT)
            setWoqlClient(client)
            setLoading(false)
        }
        catch(e) {
            setConnectionError(e)
        }
    }, [])

    useEffect(() => {
        if(!woqlClient) return
        woqlClient.getSchemaFrame(null, DATA_PRODUCT).then((res) => {
            let extractedPrefix = extractPrefix(res)
            setPrefix(extractedPrefix)
            setFrames(res)
        })
        .catch((err) =>  {
            setConnectionError(`Error in init woql while fetching schema frames - ${err.message}`)
        })
    }, [woqlClient])

    function clearMessages() {
        setConnectionError(false)
        setSuccessMsg(false)
        setErrorMsg(false)
    }

    useEffect(() => {
        clearMessages()
    }, [page])



    return (
        <WOQLContext.Provider
            value={{
                woqlClient,
                frames,
                connectionError,
                successMsg,
                setSuccessMsg,
                errorMsg,
                setErrorMsg,
                setPage,
                clearMessages,
                loading,
                setLoading,
                refresh,
                setRefresh,
                prefix
            }}
        >
            {children}
        </WOQLContext.Provider>
    )
}
