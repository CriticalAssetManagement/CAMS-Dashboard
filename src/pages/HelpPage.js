import React from "react"
import {Card, Container} from "react-bootstrap"

export const HelpPage = () => { 
    
    
    return  <Container className="centralize-container">
        <Card style={{ width: '43rem' }} className="centralize-help-card">
            <Card.Img variant="top" src="https://github.com/CriticalAssetManagement/CAMS-web-assets/raw/main/Images/CAMS-GitHub-Header-v5.jpg" />
            <Card.Body className="text-center">
                
                    Please append your Team Name to the browser url like the examples below.
                    <hr/> 
                    <code>{`${window.location.href}yourTeamName`}</code>
                    <br/>
                    <code>{`${window.location.href}Dominica`}</code>
                
            </Card.Body>
        </Card>
    </Container>
    
}

//<h1 className="text-center">404 NOT FOUND</h1>

       