import React, {useState, useEffect, useContext} from 'react'
const TerminusDBClient = require("@terminusdb/terminusdb-client")
export const WOQLContext = React.createContext()
export const WOQLClientObj = () => useContext(WOQLContext)
import {DATA_PRODUCT} from "./constants"
import {HOME_PAGE} from './routing/constants'
import {AccessControlDashboard} from "@terminusdb/terminusdb-access-control-component"
import {getClientAccessControl} from "./utils/clientAccessControl"
import { useAuth0 } from "@auth0/auth0-react";
//profiles_test 
export const WOQLClientProvider = ({children, team}) => {
    const {user,getAccessTokenSilently } = useAuth0();
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
    const [accessControlDashboard,setAccessControlDash] = useState(false)

    const initAccessControlAndClient = async()=>{
        const jwtoken = await getAccessTokenSilently()

        const client = new TerminusDBClient.WOQLClient(`${server}${team}/`, {
            user: user.email,
            organization: team
        })

        let hubcreds = {type: "jwt", key: jwtoken, user: user.email}
        client.localAuth(hubcreds)
        client.db(DATA_PRODUCT)
        setWoqlClient(client)

        const clientAccessControl = getClientAccessControl(team)
        const accessControlDash = new AccessControlDashboard(clientAccessControl)

        clientAccessControl.setJwtToken(jwtoken)
        await accessControlDash.callGetRolesList()
        // get team role
        await accessControlDash.callGetUserTeamRole(team,user.email)
        console.log("accessControlDash", accessControlDash)
        setAccessControlDash(accessControlDash)
    }

    /* Initialize client */
    useEffect(() => {
        try{
            //client.setApiKey(token)
            if(user && team){

                /*const client = new TerminusDBClient.WOQLClient(`${server}${team}/`, {
                    user: user.email,
                    organization: team
                })


                let hubcreds = {type: "jwt", key: jwtoken, user: user.email}
                client.localAuth(hubcreds)

                client.db(DATA_PRODUCT)*/
                initAccessControlAndClient()
                //initAccessControl()
                setLoading(false)
            }
        }
        catch(e) {
            setConnectionError(e)
        }
    }, [user])

    useEffect(() => {
        if(!woqlClient) return
        woqlClient.getSchemaFrame(null, DATA_PRODUCT).then((res) => {
            //let extractedPrefix = extractPrefix(res)
            //setPrefix(extractedPrefix)
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
                team,
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
                //prefix,
                accessControlDashboard
            }}
        >
            {children}
        </WOQLContext.Provider>
    )
}
