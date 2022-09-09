import React, {useState, useEffect} from "react"
import {Layout} from "../components/Layout"
import {ProgressBar, Button} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {USER_TYPE, USER_PAGE_TABLE_CSS, EDIT_CLICKED_USER, CREATE_USER_TAB, VIEW_USER_LIST, VIEW_CLICKED_USER} from "./constants"
import {Alerts} from "../components/Alerts"
import {DocumentHook, GetDocumentListHook, GetDocumentHook, DeleteDocumentHook, EditDocumentHook} from "../hooks/DocumentHook"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {DocumentContextObj} from "../hooks/DocumentContextProvider"
import {DisplayDocuments, ViewDocument, CreateDocument, EditDocument} from "../components/Display"
import {BiArrowBack} from "react-icons/bi"
import {Login} from "./Login"
import {QueryHook} from "../hooks/QueryHook"
import {Table} from "../components/Table"
import {getAssetLinks} from "../hooks/queries"
import {getReportsConfig} from "../components/Views"
import { FaLanguage } from "react-icons/fa"

export const Reports = () => {

    const {
        woqlClient,
        language,
        frames,
        clientUser
	} = WOQLClientObj()

    const {
        isAuthenticated
    } = clientUser

    const {
        tabControl
    } = DocumentContextObj()

    const [query, setQuery] = useState(false)
    const [assets, setAssets] = useState(false)
    const [loading,setLoading] = useState(false)
    let results = QueryHook(woqlClient, query, setLoading)

    useEffect(() => {
        if(!woqlClient) return
        let q=getAssetLinks()
        setQuery(q)
    }, [])


    useEffect(() => {
        // modify results to get max number of links
        if(Array.isArray(results) && results.length) {
            let modifiedResults = []
            setAssets(results)
            results.map(res => {
                if(modifiedResults.length===0) {
                    let doc={}
                    doc["Asset"]=res["Asset"]
                    doc["Critical"]=1
                    doc["Name"]=res["Name"]
                    doc["AssetIdentifier"]=res["AssetIdentifier"]
                    modifiedResults.push(doc)
                }
                else {
                    let match=false
                    modifiedResults.map(mres => {
                        if(mres["Asset"] === res["Asset"]) {
                            mres["Critical"] = mres["Critical"] + 1
                            match=true
                            return
                        }
                    })
                    if(!match) {
                        let doc={}
                        doc["Asset"]=res["Asset"]
                        doc["Critical"]=1
                        doc["Name"]=res["Name"]
                        doc["AssetIdentifier"]=res["AssetIdentifier"]
                        modifiedResults.push(doc)
                    }
                }

            })
            setAssets(modifiedResults)
        }
    }, [results])

    return <div className="mb-5">
        <Layout/>
        {tabControl.read  && <div className="px-3 content-container">
            <span className="table-word-break">
                <Table documents = {assets}
                    //css={CRITCAL_LIST_TABLE_CSS}
                    csvConfig={language.REPORT_CSV_CONFIG}
                    config={getReportsConfig(assets, language)}
                    type={null}
                />
            </span>
        </div>} 

    </div>

}