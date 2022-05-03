import {useAuth0} from "@auth0/auth0-react"
import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom"
import {loginConf} from "../utils/auth0LoginConf"

//to be review
const teamIdList = ["Dominica"]
//return to does not work it return the default state
//withAuthenticationRequired does not works, not pass the options properly 
export const ProtectedComponent = ({ component:Component,...props}) => {
    let {teamid} = useParams()
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
        const fn = async () => {
          if (!isAuthenticated) {
            if(!teamid || teamIdList.indexOf(teamid) === -1){
              Alert("not found")
            }
           await loginWithRedirect(loginConf())
          }
        };
        fn();
      }, [isAuthenticated]);
    return isAuthenticated === true ? <Component {...props} /> : null;
}

//const Render = withAuthenticationRequired(component,loginConf);
  