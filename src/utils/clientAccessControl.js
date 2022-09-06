import TerminusClient from '@terminusdb/terminusdb-client'
let server = process.env.TERMINUSDB_SERVER

export const getClientAccessControl = (accessCredential) =>{
  //to be review 
  const accessControl = new TerminusClient.AccessControl(server,accessCredential)
  

  accessControl.sendOrgInvite = function (userEmail, role, note = '', orgName) {
    const org = orgName || this.defaultOrganization;

    const returnTo = `${window.location.origin}/${org}`
    return this.dispatch(`${this.baseURL}/private/organizations/${TerminusClient.UTILS.encodeURISegment(org)}/invites`, "POST", {
      email_to: userEmail,
      role,
      note,
      returnTo:returnTo
    });
  }  

  return accessControl
}



