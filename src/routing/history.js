import { createBrowserHistory } from "history";

const basename = process.env.REACT_APP_BASE_ROUTER ?  {basename: process.env.REACT_APP_BASE_ROUTER } : {}
export default createBrowserHistory(basename);