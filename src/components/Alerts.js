import React from "react"
import {ALERT_DANGER, ALERT_SUCCESS} from "./constants"
import {Alert} from "react-bootstrap"

export const Alerts = ({successMsg, errorMsg})  => {
    return <React.Fragment>
        {successMsg &&
            <Alert variant={ALERT_SUCCESS}>
                {successMsg}
            </Alert>
        }
        {errorMsg &&
            <Alert variant={ALERT_DANGER}>
                {errorMsg}
            </Alert>
        }
    </React.Fragment>
}