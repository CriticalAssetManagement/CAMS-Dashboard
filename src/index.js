import React from "react"
import ReactDOM from "react-dom"
import {App} from "./App"
require('./App.css')
import {WOQLClientProvider} from './init-woql-client'
import {localSettings} from "../localSettings"
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./utils/history";

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

// https://auth0.github.io/auth0-react/interfaces/auth0_provider.auth0provideroptions.html
// for a full list of the available properties on the provider
export const providerConfig ={
  domain:  process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  audience: process.env.AUTH0_AUDIENCE ,
  redirectUri: `${window.location.origin}`,
  onRedirectCallback,
  appName:"CAMS"
};

ReactDOM.render(
  <Auth0Provider {...providerConfig}>
	  <WOQLClientProvider params={localSettings}>
    	<App />
	</WOQLClientProvider>
  </Auth0Provider>,
  document.getElementById("root")
);


