import React, {useState, useEffect, useContext} from 'react'
const TerminusDBClient = require("@terminusdb/terminusdb-client")
export const WOQLContext = React.createContext()
export const WOQLClientObj = () => useContext(WOQLContext)
import {DATA_PRODUCT} from "./constants"

export const WOQLClientProvider = ({children, params}) => {

    let team = process.env.MY_TEAM
    let token = process.env.MY_TOKEN
    let user = process.env.MY_USER

    const [woqlClient, setWoqlClient] = useState(false)
    const [connectionError, setConnectionError] = useState(false)
    const [frames, setFrames] = useState(false)

    const [successMsg, setSuccessMsg] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)

    const client = new TerminusDBClient.WOQLClient(`https://cloud.terminusdb.com/${team}/`, {
        user: user,
        organization: team
    })

    /* Initialize client */
    useEffect(() => {
        try{
            client.setApiKey(token)
            client.db(DATA_PRODUCT)
            setWoqlClient(client)
        }
        catch(e) {
            setConnectionError(e)
        }
    }, [])

    useEffect(() => {
        if(!woqlClient) return
        woqlClient.getSchemaFrame(null, DATA_PRODUCT).then((res) => {
            setFrames(res)
        })
        .catch((err) =>  {
            setConnectionError(`Error in init woql while fetching schema frames - ${err.message}`)
        })
    }, [woqlClient])



    return (
        <WOQLContext.Provider
            value={{
                woqlClient,
                frames,
                connectionError,
                successMsg,
                setSuccessMsg,
                errorMsg,
                setErrorMsg
            }}
        >
            {children}
        </WOQLContext.Provider>
    )
}
