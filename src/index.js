import React from "react"
import ReactDOM from "react-dom"
import {App} from "./App"
require('./App.css')
import {WOQLClientProvider} from './init-woql-client'
import {localSettings} from "../localSettings"
import {DocumentContextProvider} from "./hooks/DocumentContextProvider"


ReactDOM.render(
	<WOQLClientProvider params={localSettings}>
		 <DocumentContextProvider>
		 	<App />
		 </DocumentContextProvider>
	</WOQLClientProvider>
, document.getElementById('root'))

