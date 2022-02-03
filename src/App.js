import React from "react"
import {Router,Switch,Route} from "react-router-dom"
import {HomePage} from "./pages/HomePage"
import {UserForm} from "./pages/UserForm"
import {AreaForm} from "./pages/AreaForm"
import {AssetForm} from "./pages/AssetForm"
import {Reports} from "./pages/Reports"
import history from "./routing/history"
import {USER_FORM_PAGE, HOME_PAGE, AREA_FORM_PAGE, ASSET_FORM_PAGE, REPORTS_PAGE} from "./routing/constants"

export function App (props){

    return <React.Fragment>
		<div className="container-fluid container-background h-100">
			<Router history={history}>
				<Switch>
					<Route path={HOME_PAGE} component = {HomePage} exact/>
					<Route path={USER_FORM_PAGE} component = {UserForm} exact/>
					<Route path={AREA_FORM_PAGE} component = {AreaForm} exact/>
					<Route path={ASSET_FORM_PAGE} component = {AssetForm} exact/>
					<Route path={REPORTS_PAGE} component = {Reports} exact/>
				</Switch>
			</Router>
        </div>

    </React.Fragment>
}