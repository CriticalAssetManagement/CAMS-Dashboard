import React from "react"
import {ALERT_DANGER, ALERT_SUCCESS} from "./constants"
import {Alert} from "react-bootstrap"

export const Alerts = ({successMsg, errorMsg})  => {


    return <React.Fragment>
        {successMsg &&
            <div className="mt-5">
                <Alert variant={ALERT_SUCCESS}>
                    {successMsg}
                </Alert>
            </div>
        }
        {errorMsg &&
            <div className="mt-5">
                <Alert variant={ALERT_DANGER}>
                    {errorMsg}
                </Alert>
            </div>
        }
    </React.Fragment>
}