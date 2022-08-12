import React, {useState, useEffect, useContext} from 'react'
const TerminusDBClient = require("@terminusdb/terminusdb-client")
export const WOQLContext = React.createContext()
export const WOQLClientObj = () => useContext(WOQLContext)
import {DATA_PRODUCT} from "./constants"
import {HOME_PAGE} from './routing/constants'
import {AccessControlDashboard} from "@terminusdb/terminusdb-access-control-component"
import {getClientAccessControl} from "./utils/clientAccessControl"
import { useAuth0 } from "@auth0/auth0-react"
import * as EN_LANGUAGE from "./components/languages/constants_en"
import * as SPA_LANGUAGE from "./components/languages/constants_spa"
import {SANTA_ANA_TEAM} from "./constants"
import {getMapConfigQuery} from "./hooks/queries"
import {VAR_ZOOM, VAR_CENTER} from "./components/constants"

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

    // config 
    const [language, setLanguage]=useState(EN_LANGUAGE) // language
    const [mapConfig, setMapConfig]=useState(false) // map configuration

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
        getMapConfig(client, setMapConfig, setErrorMsg)

        const clientAccessControl = getClientAccessControl(team)
        const accessControlDash = new AccessControlDashboard(clientAccessControl)

        clientAccessControl.setJwtToken(jwtoken)
        await accessControlDash.callGetRolesList()
        // get team role
        const currentUser = user ? user['http://terminusdb.com/schema/system#agent_name'] : false
        await accessControlDash.callGetUserTeamRole(currentUser,team)
        //console.log("accessControlDash", accessControlDash)
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
                console.log("user", user)
                initAccessControlAndClient()
                //initAccessControl()
                
                // language used is English by default, if team is Santa Ana then language is set to Spanish
                if(team === SANTA_ANA_TEAM) setLanguage(SPA_LANGUAGE)

                setLoading(false)
            }
        }
        catch(e) {
            setConnectionError(e)
        }
    }, [user])

    /** Get Map config */
    async function getMapConfig(client, setMapConfig, setErrorMsg) {
        // get Map Config  
        if(!client) return          
        let mapQ = getMapConfigQuery()
        await mapQ.execute(client)
        .then((res) => {
            let json = {} 
            let config = res.bindings[0] // Should be only 1 entry for map config
            json[VAR_CENTER]=[config['X']["@value"], config['Y']["@value"]]
            json[VAR_ZOOM]=config[VAR_ZOOM]["@value"]
            setMapConfig(json)
        })
        .catch((err) => {
            let errMessage=`Cannot find Map Configuration to set Map`
            if(setErrorMsg) setErrorMsg(`${errMessage} - ${err.message}`)
        })
    }

    
    /** Get frames */
    useEffect(() => {
        if(!woqlClient) return
        woqlClient.getSchemaFrame(null, DATA_PRODUCT).then((res) => {
            setFrames(res)
        })
        .catch((err) =>  {
            setConnectionError(`Error in init woql while fetching schema frames - ${err.message}`)
        })
    }, [mapConfig])

    
    function clearMessages() {
        setConnectionError(false)
        setSuccessMsg(false)
        setErrorMsg(false)
    }

    useEffect(() => {
        clearMessages()
    }, [page])

    //console.log("mapConfig init", mapConfig)

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
                accessControlDashboard,
                language,
                mapConfig
            }}
        >
            {children}
        </WOQLContext.Provider>
    )
}
