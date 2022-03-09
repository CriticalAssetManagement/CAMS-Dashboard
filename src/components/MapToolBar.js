import React, {useState, useEffect} from "react"
import {Card, Col, Row, Button} from "react-bootstrap"
import Dropdown from 'react-bootstrap/Dropdown'
import {CRITICAL_LINKS_TITLE, CRITICAL_LINKS, SEARCH_ASSET_Label, SEARCH_ASSET_PLACEHOLDER, FAILURE_CHAIN_TITLE, HAZARD_TYPE, HAZARD_DROPDOWN_TITLE} from "./constants"
import Select from 'react-select'
import {getAssetSelectOptions} from "./utils"
import {DocumentDetail} from "./DocumentDetail"
import {WOQLClientObj} from '../init-woql-client'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes'



export const MapToolBar = ({setFilterAssetByEvent, setFailureChain, showAssets, filteredAssets, setFilterAssetById, setFilteredAssets, polyLine, setCriticalLinks, setPolyLine}) => {

    const {
        prefix,
        frames
	} = WOQLClientObj()

    const [eventList, setEventList] = useState(false)


    function handleEvents(e) {
        if(setFilterAssetByEvent) setFilterAssetByEvent(e)
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
                    <Button className="ml-3 failure-chain-button" variant="outline-success">
                        <input className="text-success failure-chain-checkbox"
                            type="checkbox"
                            id="failure_chain"
                            name="failure_chain"
                            onChange={handleChecked}
                            value={false}/>
                        <label className="text-success ml-3">{FAILURE_CHAIN_TITLE}</label>
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