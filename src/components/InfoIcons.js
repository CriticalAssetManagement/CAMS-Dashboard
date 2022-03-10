import React, {useState, useLayoutEffect} from "react"
import {ButtonToolbar, Badge, ButtonGroup, Button, Row, Col, ListGroup} from "react-bootstrap"
import {AiFillAlert, AiOutlineAlert} from "react-icons/ai"
import {CRITICAL_LINKS, NON_CRITICAL_LINKS, EMPTY_PLACEHOLDER} from "./constants"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {getCriticalAssetConfig} from "./Views"
import {Table} from "./Table"

const ShowCriticalList = ({documents}) => {
    if(!Array.isArray(documents)) return <small className="text-muted">{EMPTY_PLACEHOLDER}</small>

    let criticalList = []

    documents.map(docs => {
        if(docs.critical === 'true') { // have stored as string to display in WOQLTable
            criticalList.push(docs)
        }
    })

    return <Table documents = {criticalList}
        config={getCriticalAssetConfig(criticalList)}
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


export const InfoIcons = ({documents}) => {
    const [key, setKey] = useState(CRITICAL_LINKS);

    return <Tabs  id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        transition={true}>
        <Tab tabClassName="text-gray" eventKey={CRITICAL_LINKS} title={CRITICAL_LINKS}>
            <ShowCriticalList documents={documents}/>
        </Tab>
        <Tab tabClassName="text-gray" eventKey={NON_CRITICAL_LINKS} title={NON_CRITICAL_LINKS}>
            <ShowNonCriticalList documents={documents}/>
        </Tab>
    </Tabs>



}