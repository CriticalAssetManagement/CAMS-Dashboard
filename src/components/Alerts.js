import React from "react"
import {ALERT_DANGER, ALERT_SUCCESS} from "./constants"
import {Alert} from "react-bootstrap"

export const Alerts = ({successMsg, errorMsg})  => {
    return <div className="mt-5">
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
    </div>
}