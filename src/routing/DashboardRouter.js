import React from "react"
import {
    Router,
    Switch,
    Route,
} from "react-router-dom"

export const DashboardRouter = () => {

    return (<Switch>
            <Route path="/" exact>
                  <div> HOME PAGE</div>
            </Route>
            <Route path="/first" exact>
                  <div> HELLO FIRST PAGE</div>
            </Route>
            <Route path="/second" exact>
                  <div> HELLO second PAGE</div>
            </Route>
        </Switch>)
}