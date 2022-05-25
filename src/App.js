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

export function App (props){
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