import React, {useState, useEffect, useContext} from 'react'
const TerminusDBClient = require("@terminusdb/terminusdb-client")
import {getPrefix} from "@terminusdb/terminusdb-documents-ui"
export const WOQLContext = React.createContext()
export const WOQLClientObj = () => useContext(WOQLContext)
import {DATA_PRODUCT} from "./constants"
import {HOME_PAGE} from './routing/constants'
import {AccessControlDashboard} from "@terminusdb/terminusdb-access-control-component"
import {clientAccessControl} from "./utils/clientAccessControl"
import { useAuth0 } from "@auth0/auth0-react";
//profiles_test
export const WOQLClientProvider = ({children, params}) => {
    const {user,getAccessTokenSilently } = useAuth0();

    let team = process.env.MY_TEAM
    let token = process.env.MY_TOKEN
    //let user = process.env.MY_USER
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

    const initAccessControl = async()=>{
        const accessControlDash = new AccessControlDashboard(clientAccessControl)
        const jwtoken = await getAccessTokenSilently()
        clientAccessControl.setJwtToken(jwtoken)
        await accessControlDash.callGetRolesList()
        await accessControlDash.callGetUserTeamRole(team,user.email)
        setAccessControlDash(accessControlDash)
        //get role for team ... 
    }

    /* Initialize client */
    useEffect(() => {
        try{          
            //client.setApiKey(token)
            if(user){
                const client = new TerminusDBClient.WOQLClient(`${server}${team}/`, {
                    user: user.email,
                    organization: team
                })
    
                
                client.db(DATA_PRODUCT)
                initAccessControl()          
                setWoqlClient(client)
                setLoading(false)
            }
        }
        catch(e) {
            setConnectionError(e)
        }
    }, [user])

    useEffect(() => {
        if(!woqlClient) return
        async function getFrame(){
            const jwtoken = await getAccessTokenSilently()
            //set the jwt token credential
            let hubcreds = {type: "jwt", key: jwtoken, user: user.email}
            woqlClient.localAuth(hubcreds)
             //set the jwt token credential
            
            woqlClient.getSchemaFrame(null, DATA_PRODUCT).then((res) => {
                let extractedPrefix = getPrefix(res)
                setPrefix(extractedPrefix)
                setFrames(res)
            })
            .catch((err) =>  {
                setConnectionError(`Error in init woql while fetching schema frames - ${err.message}`)
            })

        }
        getFrame()
       
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
                prefix,
                accessControlDashboard
            }}
        >
            {children}
        </WOQLContext.Provider>
    )
}
