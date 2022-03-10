import React, {useState, useEffect} from "react"
import {Card, Col, Row, Button} from "react-bootstrap"
import Dropdown from 'react-bootstrap/Dropdown'
import {CRITICAL_LINKS_TITLE, CRITICAL_LINKS, SEARCH_ASSET_Label, SHOW_ALL_ASSETS_TITLE, SHOW_ALL_ASSETS, SEARCH_ASSET, SEARCH_ASSET_PLACEHOLDER, FAILURE_CHAIN_TITLE, HAZARD_TYPE, HAZARD_DROPDOWN_TITLE} from "./constants"
import Select from 'react-select'
import {getAssetSelectOptions} from "./utils"
import {DocumentDetail} from "./DocumentDetail"
import {WOQLClientObj} from '../init-woql-client'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes'
import {SearchBar} from "./SearchBar"

export const MapToolBar = ({setResetMap, setFilterAssetByEvent, setFailureChain, setFilterAssetById}) => {

    const {
        prefix,
        frames
	} = WOQLClientObj()

    const [eventList, setEventList] = useState(false)


    function handleEvents(e) {
        if(setFilterAssetByEvent) setFilterAssetByEvent(e)
    }

    function handleShowAll() {
        if(setResetMap) setResetMap(Date.now())
    }


    useEffect(() => {
        // get all hazard event names
        if(Object.keys(frames).length) {
            let type = `${prefix}${HAZARD_TYPE}`
            let list = frames[type]["@values"], options=[]
            list.map(lst => {
                options.push({label: lst, value: lst})
            })
            setEventList(options)
        }
    }, [frames])

    function handleChecked (e) {
        if(setFailureChain) setFailureChain(e.target.checked)
    }


    return <Card>
        <Card.Body className="d-flex">
            <Row className="w-100">

                <Col md={3}>
                    <SearchBar placeholder={SEARCH_ASSET_PLACEHOLDER} setFilterAssetById={setFilterAssetById}/>
                </Col>
                <Col md={1}>
                    { eventList && <div className="hazard-select-button">
                        <ReactMultiSelectCheckboxes
                            options={eventList}
                            placeholderButtonLabel={HAZARD_DROPDOWN_TITLE}
                            onChange={handleEvents}
                        />
                    </div>
                    }
                </Col>
                <Col md={2}>
                    <Button className="failure-chain-button" variant="outline-success">
                        <input className="text-success failure-chain-checkbox"
                            type="checkbox"
                            id="failure_chain"
                            name="failure_chain"
                            onChange={handleChecked}
                            value={false}/>
                        <label className="text-success">{FAILURE_CHAIN_TITLE}</label>
                    </Button>
                </Col>

                <Col md={2}>
                    <Button variant="outline-success" onClick={handleShowAll} title={SHOW_ALL_ASSETS_TITLE}>
                        {SHOW_ALL_ASSETS}
                    </Button>
                </Col>

        </Row>
        </Card.Body>
    </Card>
}

/**
 * let hazard = "@schema:Hazard/Pest%20Infestations"
triple("v:Assets", "@schema:applicable_hazards", hazard)
str.replace(/%20/g, " ");
 */