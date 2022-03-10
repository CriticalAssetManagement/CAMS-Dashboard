import React, {useState, useLayoutEffect, useEffect} from "react"
import {ButtonToolbar, Badge, ButtonGroup, Button, Row, Col, ListGroup} from "react-bootstrap"
import {AiFillAlert, AiOutlineAlert} from "react-icons/ai"
import {CRITICAL_LINKS, NON_CRITICAL_LINKS, EMPTY_PLACEHOLDER} from "./constants"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {getCriticalAssetConfig} from "./Views"
import {QueryHook} from "../hooks/QueryHook"
import {Table} from "./Table"
import {WOQLClientObj} from '../init-woql-client'
import {getOwnerDetailsQuery} from "../hooks/queries"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

const ShowCriticalList = ({documents, setCurrentAsset, ownerResults}) => {
    if(!Array.isArray(documents)) return <small className="text-muted">{EMPTY_PLACEHOLDER}</small>

    let criticalList = []

    function onRowClick(row) {
        if(setCurrentAsset) setCurrentAsset(row.original.id)
        console.log("row", row.original.id)
    }

    documents.map(docs => {
        if(docs.critical === 'true') { // have stored as string to display in WOQLTable
            criticalList.push(docs)
        }
    })

    let placement="left"

    return <Table documents = {criticalList}
        config={getCriticalAssetConfig(criticalList, onRowClick)}
    />
}

const ShowNonCriticalList = ({documents}) => {
    if(!Array.isArray(documents)) return <small className="text-muted">{EMPTY_PLACEHOLDER}</small>

    let nonCriticalList = []

    documents.map(docs => {
        if(docs.critical === 'false') { // have stored as string to display in WOQLTable
            nonCriticalList.push(docs)
        }
    })

    return <Table documents = {nonCriticalList}
        config={getCriticalAssetConfig(nonCriticalList)}
    />

}


export const DependentStatus = ({documents}) => {
    const [key, setKey] = useState(CRITICAL_LINKS)
    const [query, setQuery] = useState(false)
    const [currentAsset, setCurrentAsset] = useState(false)

    const {
        woqlClient,
        setLoading,
	} = WOQLClientObj()

    let ownerResults = QueryHook(woqlClient, query, setLoading)

    useEffect(() => {
        if(!woqlClient) return
        if(!currentAsset) return
        let q=getOwnerDetailsQuery(currentAsset)
        setQuery(q)
    }, [currentAsset])

    console.log("ownerResults", ownerResults)

    return <Tabs  id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        transition={true}>
        <Tab tabClassName="text-gray" eventKey={CRITICAL_LINKS} title={CRITICAL_LINKS}>
            <ShowCriticalList documents={documents} setCurrentAsset={setCurrentAsset} ownerResults={ownerResults}/>
        </Tab>
        <Tab tabClassName="text-gray" eventKey={NON_CRITICAL_LINKS} title={NON_CRITICAL_LINKS}>
            <ShowNonCriticalList documents={documents}/>
        </Tab>
    </Tabs>



}