export function loginConf (){
  return { appState: { targetUrl: window.location.pathname, returnTo: window.location.pathname},
          returnTo : `${window.location.origin}`
  }
}

