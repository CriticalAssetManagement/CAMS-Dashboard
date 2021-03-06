import React from "react"
import {WOQLClientObj} from '../init-woql-client'
import {Alert} from "react-bootstrap"
import {ALERT_DANGER} from "./constants"
import {Menu} from "./Menu"

export const Layout = () => {

    const {
		connectionError
	} = WOQLClientObj()

    return <React.Fragment>
        <Menu/>
		{connectionError &&
			<Alert variant={ALERT_DANGER}>
				{connectionError}
			</Alert>
		}
    </React.Fragment>

}