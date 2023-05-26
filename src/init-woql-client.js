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
import {SANTA_ANA_TEAM, MEXICO_TEAM} from "./constants"
import {getMapConfigQuery} from "./hooks/queries"
import {VAR_ZOOM, VAR_CENTER} from "./components/constants"
import {createClientUser} from "./utils/clientUtils"
import { ApolloClient,ApolloLink, concat, InMemoryCache, HttpLink } from '@apollo/client';


//profiles_test 
export const WOQLClientProvider = ({children, team}) => {

    let clientUser = createClientUser(useAuth0)

    //const {user,getAccessTokenSilently } = useAuth0();
    let server = process.env.TERMINUSDB_SERVER

    const [woqlClient, setWoqlClient] = useState(false)
    const [connectionError, setConnectionError] = useState(false)
    const [page, setPage] = useState(HOME_PAGE)
    const [frames, setFrames] = useState(false)
    const [prefix, setPrefix] = useState(false)
    const [apolloClient , setApolloClient] = useState(null)

    const [loading, setLoading]=useState(true)
    const [refresh, setRefresh]=useState(false)
    const [successMsg, setSuccessMsg] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)
    const [accessControlDashboard,setAccessControlDash] = useState(false)

    // config 
    const [language, setLanguage]=useState(EN_LANGUAGE) // language
    const [mapConfig, setMapConfig]=useState(false) // map configuration
    
    const createApolloClient = (client)=>{
        const httpLink = new HttpLink({uri:client.connectionConfig.branchBase("graphql")})
        const authMiddleware = new ApolloLink((operation, forward) => {
              // add the authorization to the headers
              operation.setContext(({ headers = {} }) => ({
              headers: {
                  ...headers,
                  authorization: `Token ${params.token}`}
              }));
              return forward(operation);
          })
          
          const cache = new InMemoryCache({
              addTypename: false
          });
          
          const value = concat(authMiddleware, httpLink)
      
          return new ApolloClient({
              cache:cache,
              defaultOptions: {
                watchQuery: {
                  fetchPolicy: 'no-cache',
                  errorPolicy: 'all',
                },
                query: {
                  fetchPolicy: 'no-cache',
                  errorPolicy: 'all',
                },
              },
              link: value,       
          });
      }

    const initAccessControlAndClient = async(url,credentials,accessCredential)=>{
        //const jwtoken = await getAccessTokenSilently()
        setConnectionError(false)
        setLoading(true)
        try{
            credentials.organization = team 
            const client = new TerminusDBClient.WOQLClient(url,credentials)

            //let hubcreds = {type: "jwt", key: jwtoken, user: user.email}
            //client.localAuth(credentials)
            client.db(DATA_PRODUCT)
            
            accessCredential.organization = team
            const clientAccessControl = getClientAccessControl(accessCredential)
            const accessControlDash = new AccessControlDashboard(clientAccessControl)
            setAccessControlDash(accessControlDash)
            //clientAccessControl.setJwtToken(jwtoken)
            await accessControlDash.callGetRolesList({"Role/infoReader":true})
            // get team role
            await accessControlDash.callGetUserTeamRole(clientUser.user,team)
            //console.log("accessControlDash", accessControlDash)
            setWoqlClient(client)
            setApolloClient(createApolloClient(client))
            getMapConfig(client, setMapConfig, setErrorMsg)
            
        }catch(e) {
            setConnectionError(e)
        }finally{
            setLoading(false)
        }
    }

    /* Initialize client */
    useEffect(() => {
            //client.setApiKey(token)
            if(clientUser.email && team){      
                    //to be review the local connection maybe don't need a user in the cloud
                    //and don't need auth0 too
                    if(process.env.CONNECTION_TYPE === "LOCAL"){
                        const user =  process.env.TERMINUSDB_USER
                        const key = process.env.TERMINUSDB_KEY
                        const credentials  = {user ,key}                        
                        initAccessControlAndClient(server,credentials,credentials)
                    }else if(clientUser && clientUser.isAuthenticated){
                        clientUser.getAccessTokenSilently().then(jwtoken=>{
                        let hubcreds = {jwt: jwtoken, user: clientUser.email}
                        // user is the Auth0 id
                        let accesscred ={jwt : jwtoken, user:clientUser.user}              
                        initAccessControlAndClient(`${server}${team}/`,hubcreds,accesscred)
                        })
                        
                    }
                }
                
                // language used is English by default, if team is Santa Ana then language is set to Spanish
                if(team === SANTA_ANA_TEAM) setLanguage(SPA_LANGUAGE)
                if(team === MEXICO_TEAM) setLanguage(SPA_LANGUAGE)
    }, [clientUser.email])

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
                clientUser,
                team,
                woqlClient,
                frames,
                connectionError,
                successMsg,
               // setSuccessMsg,
                errorMsg,
               // setErrorMsg,
                setPage,
                clearMessages,
                loading,
               // setLoading,
                refresh,
                setRefresh,
                //prefix,
                accessControlDashboard,
                language,
                mapConfig,
                apolloClient
            }}
        >
            {children}
        </WOQLContext.Provider>
    )
}
