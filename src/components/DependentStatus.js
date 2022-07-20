import React, {useState, useLayoutEffect, useEffect} from "react"
import {ButtonToolbar, Badge, ButtonGroup, Button, Row, Col, ListGroup} from "react-bootstrap"
import {AiFillAlert, AiOutlineAlert} from "react-icons/ai"
import {CRITICAL_LINKS, NON_CRITICAL_LINKS, EMPTY_PLACEHOLDER, VAR_ASSET, VAR_NAME, VAR_CRITICAL, CRITICAL_LINK_TITLE, NON_CRITICAL_LINK_TITLE, CRITICAL_LINKS_TITLE, VAR_ASSET_ENUM_SCHEMA_REF, VAR_ASSET_TYPE} from "./constants"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {getCriticalAssetConfig} from "./Views"
import {QueryHook} from "../hooks/QueryHook"
import {Table} from "./Table"
import {WOQLClientObj} from '../init-woql-client'
import {getOwnerDetailsQuery} from "../hooks/queries"
import {ContactClickedAsset} from "./ContactClickedAsset"
import {CRITCAL_LIST_TABLE_CSS} from "../pages/constants"
import {ASSET_TYPE} from "../pages/constants"

const ShowCriticalList = ({documents, setCurrentAsset, ownerResults, language}) => {
    if(!Array.isArray(documents)) return <small className="text-muted">{EMPTY_PLACEHOLDER}</small>

    let criticalList = []

    function onRowClick(row) {
        if(setCurrentAsset) setCurrentAsset(row.original)
    }

    documents.map(docs => {
        if(docs[VAR_CRITICAL] === 'true') { // have stored as string to display in WOQLTable
            criticalList.push(docs)
        }
    })

    function renderAssetType(row) {
        let value = row.value
        const ref = VAR_ASSET_ENUM_SCHEMA_REF
        let decoded=decodeURI(value)
        let extracted=decoded.substring(ref.length, decoded.length)
        return <>{extracted}</>
    }
    
    //console.log("**** language", language)

    return <span className="table-word-break">
        <Table documents = {criticalList}
            title={CRITICAL_LINK_TITLE} 
            type={null} // type null so <Table/> will display nonCriticalList (without using controleld documents)
            css={CRITCAL_LIST_TABLE_CSS}
            csvConfig={language.DEPENDENT_LIST_CSV_CONFIG}
            config={getCriticalAssetConfig(criticalList, onRowClick, renderAssetType, language)}
        />
    </span>
}

const ShowNonCriticalList = ({documents, language}) => {
    if(!Array.isArray(documents)) return <small className="text-muted">{EMPTY_PLACEHOLDER}</small>

    let nonCriticalList = []

    documents.map(docs => {
        if(docs[VAR_CRITICAL] === 'false') { // have stored as string to display in WOQLTable
            nonCriticalList.push(docs)
        }
    }) 

    return <span className="table-word-break">
        <Table documents = {nonCriticalList}
            title={NON_CRITICAL_LINK_TITLE}
            type={null} // type null so <Table/> will display nonCriticalList (without using controleld documents)
            css={CRITCAL_LIST_TABLE_CSS}
            csvConfig={language.DEPENDENT_LIST_CSV_CONFIG}
            config={getCriticalAssetConfig(nonCriticalList, language)}
        />
    </span>
}


export const DependentStatus = ({documents}) => {
    const [key, setKey] = useState(CRITICAL_LINKS)
    const [query, setQuery] = useState(false)
    const [currentAsset, setCurrentAsset] = useState(false)

    const {
        woqlClient,
        setLoading,
        language
	} = WOQLClientObj()

    let ownerResults = QueryHook(woqlClient, query, setLoading)

    useEffect(() => {
        if(!woqlClient) return
        if(!Object.keys(currentAsset).length) return
        let q=getOwnerDetailsQuery(currentAsset[VAR_ASSET])
        setQuery(q)
    }, [currentAsset])

    //console.log("ownerResults", ownerResults)
    //<OwnerContactNotifications ownerResults={ownerResults}/>

    return <React.Fragment>
        {Array.isArray(ownerResults) && ownerResults.length>0 &&
            <ContactClickedAsset ownerResults={ownerResults} info={currentAsset}/>
        }
        <Tabs  id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)} 
            transition={true}>
            <Tab tabClassName="text-gray" eventKey={CRITICAL_LINKS} title={language.CRITICAL_LINK_TITLE}>
                <ShowCriticalList language={language} documents={documents} setCurrentAsset={setCurrentAsset} ownerResults={ownerResults}/>
            </Tab>
            <Tab tabClassName="text-gray" eventKey={NON_CRITICAL_LINKS} title={language.NON_CRITICAL_LINK_TITLE}>
                <ShowNonCriticalList language={language} documents={documents}/>
            </Tab>
        </Tabs>
    </React.Fragment>


}