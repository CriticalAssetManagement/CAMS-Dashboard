import TerminusClient from '@terminusdb/terminusdb-client'
let team = process.env.MY_TEAM
//let token = process.env.MY_TOKEN
let user = process.env.MY_USER
let server = process.env.TERMINUSDB_SERVER

export const clientAccessControl = new TerminusClient.AccessControl(server,{organization:team})
    
clientAccessControl.sendOrgInvite = function (userEmail, role, note = '', orgName) {
    const org = orgName || this.defaultOrganization;
    return this.dispatch(`${this.baseURL}/private/organizations/${TerminusClient.UTILS.encodeURISegment(org)}/invites`, "POST", {
      email_to: userEmail,
      role,
      note,
    });
}
