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
import history from "./routing/history"
import { UserManagement } from "./pages/UserManagement"
import {USER_FORM_PAGE, OWNER_FORM_PAGE, ASSETS_LINK_PAGE, HOME_PAGE, AREA_FORM_PAGE, ASSET_FORM_PAGE, REPORTS_PAGE,USER_MANAGEMENT_PAGE} from "./routing/constants"
//import {USER_FORM_PAGE, OWNER_FORM_PAGE, ASSETS_LINK_PAGE, HOME_PAGE, AREA_FORM_PAGE, ASSET_FORM_PAGE, REPORTS_PAGE} from "./routing/constants"

export function App (props){

    return <React.Fragment>
		<div className="container-fluid container-background h-100">
			<BrowserRouter>
				<Routes>					
					<Route path={HOME_PAGE} element = {<HomePage/>} />
					<Route path={USER_FORM_PAGE} element = {<ManageUser/>} exact/>
					<Route path={OWNER_FORM_PAGE} element = {<ManageOwner/>} exact/>
					<Route path={AREA_FORM_PAGE} element = {<ManageArea/>} exact/>
					<Route path={ASSET_FORM_PAGE} element = {<ManageAsset/>} exact/>
					<Route path={ASSETS_LINK_PAGE} element = {<ManageLinks/>} exact/>
					<Route path={REPORTS_PAGE} element = {<Reports/>} exact/>
					<Route path={USER_MANAGEMENT_PAGE} element={<UserManagement/>} exact/>
					<Route path="/" element = {<h1 className="text-center">404 NOT FOUND</h1>} exact/>
				</Routes>
			</BrowserRouter>
        </div>

    </React.Fragment>
}
