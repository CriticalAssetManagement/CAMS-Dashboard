import React  from 'react';
import { TeamMembers } from '@terminusdb/terminusdb-access-control-component'
import {Layout} from "../components/Layout"
import {WOQLClientObj} from '../init-woql-client'
import { useAuth0 } from "@auth0/auth0-react"
import {Card} from "react-bootstrap"

export const UserManagement = (props) =>{
    const {user} = useAuth0();
    const {
        accessControlDashboard, team
    } = WOQLClientObj()


    const setting ={
        labels:{
            userListTitle:"Team Members",
            inviteAddText: `Here you can add users to CAMS ${team} team`,
            inviteMember:`Add a new user to CAMS ${team}`
        },
        tabs:{
            MEMBERS_TAB:true,
            INVITATION_TAB:false,
            REQUEST_ACCESS:true
        },
        buttons:{
            ADD_USER_TO_THE_TEAM:true
        },
        interface:{
            memberList:{
                delete:true,
                changeRole:true,
                showDatabase:false
            }
        },
        hookMessage:{
            sendInvitation:{
                error: `I can not add the User to CAMS ${team} team`,
                success:`The user has been added to CAMS ${team} team`
            }
        },
    }

    return  <div className="mb-5">
                <Layout/>
                <Card className="border-0">
                    <div className="user-mnagement-padding">
                        <TeamMembers organization={team} currentUser={user} options={setting} accessControlDashboard={accessControlDashboard} />
                    </div>
                </Card>
            </div>
}
