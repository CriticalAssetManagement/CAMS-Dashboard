import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {HomePage} from "./pages/HomePage"
import {AssetForm} from "./pages/AssetForm"
import {Reports} from "./pages/Reports"
import {ProtectedComponent} from "./routing/ProtectedComponent"
import {ManageUser} from "./routing/ManageUser"
import {ManageOwner} from "./routing/ManageOwner"
import {ManageArea} from "./routing/ManageArea"
import {ManageAsset} from "./routing/ManageAsset"
import {ManageLinks} from "./routing/ManageLinks"
import {ManageReports} from "./routing/ManageReports"
//import history from "./routing/history"
import { UserManagement } from "./pages/UserManagement"
import {HelpPage} from "./pages/HelpPage"
import {USER_FORM_PAGE, OWNER_FORM_PAGE, ASSETS_LINK_PAGE, HOME_PAGE, AREA_FORM_PAGE, ASSET_FORM_PAGE, REPORTS_PAGE,USER_MANAGEMENT_PAGE} from "./routing/constants"
//import {USER_FORM_PAGE, OWNER_FORM_PAGE, ASSETS_LINK_PAGE, HOME_PAGE, AREA_FORM_PAGE, ASSET_FORM_PAGE, REPORTS_PAGE} from "./routing/constants"
import {WOQLClientObj} from './init-woql-client'
import {ProgressBar} from 'react-bootstrap'
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
export function App (props){
	// the woqlclient loading means that the client and access control not are inizialized
	const {
		accessControlDashboard,
		clientUser,
        loading
	} = WOQLClientObj()

	const isAuthenticated = clientUser.isAuthenticated;
	
	if(!isAuthenticated) { 
        return <div className="mb-5">
				<Layout/>
                <Login/>
            </div>
    }
	//this is the application progress bar not confuse with the page progress bar!!!!
	//meas that Auth0 is loading or the server/access control has been created
	//clientUser.loading is auth0 loading if enabled
	//maybe we can review it 
    if(clientUser.loading || loading){
        return <div className="mb-5">
				<Layout/>
                <ProgressBar animated now={100} variant="info"/>
                </div>
    }

	
	const isAdmin = accessControlDashboard && accessControlDashboard.isAdmin() ? true : false
   
    return <React.Fragment>
			<div className="container-fluid container-background h-100">			
				<Routes >	
						<Route path={HOME_PAGE} element = {<HomePage/>}/>	
						<Route path={USER_FORM_PAGE} element = {<ManageUser/>} />
						<Route path={OWNER_FORM_PAGE} element = {<ManageOwner/>} />
						<Route path={AREA_FORM_PAGE} element = {<ManageArea/>} />
						<Route path={ASSET_FORM_PAGE} element = {<ManageAsset/>} />
						<Route path={ASSETS_LINK_PAGE} element = {<ManageLinks/>} />
						<Route path={REPORTS_PAGE} element = {<ManageReports/>} />
						<Route path={USER_MANAGEMENT_PAGE} element={<UserManagement/>} />
						<Route path="/" element = {<HelpPage/>} />
				</Routes>
			
        </div>

    </React.Fragment> 
}