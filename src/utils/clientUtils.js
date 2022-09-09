export function createClientUser(useAuth0){
    let clientUser = {connection_type : process.env.CONNECTION_TYPE}
    try{
        if(process.env.CONNECTION_TYPE !== "LOCAL"){
            const {isAuthenticated,user,getAccessTokenSilently,logout,loginWithRedirect,loading} = useAuth0()
            clientUser = user || {}
            clientUser.isAuthenticated = isAuthenticated
            clientUser.logout = logout
            clientUser.loading = loading
            clientUser.loginWithRedirect = loginWithRedirect
            clientUser.getAccessTokenSilently = getAccessTokenSilently
            clientUser.agentName= user ? user['http://terminusdb.com/schema/system#agent_name'] : false
            clientUser.firstLogin = user && user['http://terminusdb.com/schema/system#afterSignUp'] ? true : false 
            // the agentName is the userID
            clientUser.user = clientUser.agentName
        }else{
            clientUser = {email: process.env.TERMINUSDB_USER } 
            clientUser.user =  process.env.TERMINUSDB_USER
            clientUser.isAuthenticated = true
        }
    }catch(err){
        clientUser = {email: process.env.TERMINUSDB_USER } 
        clientUser.user =  process.env.TERMINUSDB_USER
        clientUser.isAuthenticated = true
    }
    //console.log("CLIENT",clientUser)
    return clientUser
}
