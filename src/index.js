import React from "react"
import ReactDOM from "react-dom"
import {App} from "./App"
require('./App.css')
import {WOQLClientProvider} from './init-woql-client'
import {teamIdList} from "./constants"
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter,useNavigate } from "react-router-dom";

function NavigationComponent(){
let navigate = useNavigate();
const onRedirectCallback = (appState) => {
	navigate(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
};
//check if the teamName is correct before going on
let teamName
const pathNameArr = window.location.pathname.split('/')
if(pathNameArr.length>0 && pathNameArr[1].length > 0){
	teamName=pathNameArr[1]
	if(teamIdList.indexOf(teamName) === -1){
		teamName = undefined
		window.location.replace(window.location.origin)		
	}
}
// https://auth0.github.io/auth0-react/interfaces/auth0_provider.auth0provideroptions.html
// for a full list of the available properties on the provider
const providerConfig ={
	domain:  process.env.AUTH0_DOMAIN,
	clientId: process.env.AUTH0_CLIENT_ID,
	audience: process.env.AUTH0_AUDIENCE ,
	redirectUri: window.location.origin,
	onRedirectCallback,
	appName:"CAMS",
	teamName:teamName
};

return <Auth0Provider {...providerConfig}>
			<WOQLClientProvider team={teamName}>
				<App />
			</WOQLClientProvider>
		</Auth0Provider>
}

ReactDOM.render(
	<BrowserRouter>
		<NavigationComponent/>
	</BrowserRouter>,
	document.getElementById("root")
);


