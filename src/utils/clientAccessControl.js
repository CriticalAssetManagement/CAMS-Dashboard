import TerminusClient from '@terminusdb/terminusdb-client'
let server = process.env.TERMINUSDB_SERVER

export const getClientAccessControl = (team) =>{
   
  const accessControl = new TerminusClient.AccessControl(server,{organization:team})

  accessControl.sendOrgInvite = function (userEmail, role, note = '', orgName) {
    const org = orgName || this.defaultOrganization;
    return this.dispatch(`${this.baseURL}/private/organizations/${TerminusClient.UTILS.encodeURISegment(org)}/invites`, "POST", {
      email_to: userEmail,
      role,
      note,
    });
  }  

  return accessControl
}



