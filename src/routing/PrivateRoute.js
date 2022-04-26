import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Route , useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
const { isAuthenticated, loginWithRedirect } = useAuth0();

let {refid,teamid} = useParams()
//const path="http://localhost:3030/my_product_test?refid=testttjdfjlfwkeowo3ponvjgie4u3iw&team=team0" //`${window.location.origin}/my_product_test?refid=jdfjlfwkeowo3ponvjgie4u3iw%26team=team01`;

//in refid we have the invitation id and the teamName
  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated) {
        const loginConf ={
          appState: { targetUrl: path }

        }
       await loginWithRedirect(loginConf)
      }
    };
    fn();
  }, [isAuthenticated]);

  const render = props =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired
};

export default PrivateRoute;
