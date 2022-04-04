import React from "react"
import {Router,Switch,Route} from "react-router-dom"
import {HomePage} from "./pages/HomePage"
import {AssetForm} from "./pages/AssetForm"
import {Reports} from "./pages/Reports"
import {ManageUser} from "./routing/ManageUser"
import {ManageArea} from "./routing/ManageArea"
import {ManageAsset} from "./routing/ManageAsset"
import {ManageLinks} from "./routing/ManageLinks"
import history from "./routing/history"
import { UserManagement } from "./pages/UserManagement"
import {USER_FORM_PAGE, ASSETS_LINK_PAGE, HOME_PAGE, AREA_FORM_PAGE, ASSET_FORM_PAGE, REPORTS_PAGE,USER_MANAGEMENT_PAGE} from "./routing/constants"

export function App (props){

    return <React.Fragment>
		<div className="container-fluid container-background h-100">
			<Router history={history}>
				<Switch>
					<Route path={HOME_PAGE} component = {HomePage} exact/>
					<Route path={USER_FORM_PAGE} component = {ManageUser} exact/>
					<Route path={AREA_FORM_PAGE} component = {ManageArea} exact/>
					<Route path={ASSET_FORM_PAGE} component = {ManageAsset} exact/>
					<Route path={ASSETS_LINK_PAGE} component = {ManageLinks} exact/>
					<Route path={REPORTS_PAGE} component = {Reports} exact/>
					<Route path={USER_MANAGEMENT_PAGE} component={UserManagement} exact/>
				</Switch>
			</Router>
        </div>

    </React.Fragment>
}
