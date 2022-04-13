import React from "react"
import {Button, Alert, Card} from "react-bootstrap"
import { useAuth0 } from "@auth0/auth0-react"

export const Login = () => {

    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0()

    const returnTo=`${window.location.origin}`

    return <Card  className="login mx-5 bg-success p-5" style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://climateresilient.world/wp-content/uploads/2022/03/CAMS-Logo-Light-Simple-200px.png" />
        <Card.Body>
            <Card.Text className="text-light">Hello, Please login to continue...</Card.Text>
            <div className="d-flex justify-content-center">
                <Button
                    id="qsLoginBtn"
                    color="primary"
                    onClick={() => loginWithRedirect({returnTo:returnTo})}
                    className="btn-lg">
                    Log in
                </Button>
            </div>
        </Card.Body>
    </Card>


}
