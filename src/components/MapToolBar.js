import React, {useState} from "react"
import {Card, Form, InputGroup} from "react-bootstrap"
import {CRITICAL_LINKS_TITLE, CRITICAL_LINKS, SEARCH_ASSET_Label, SEARCH_ASSET_PLACEHOLDER} from "./constants"
import Select from 'react-select'
import {getAssetSelectOptions} from "./utils"
import {DocumentDetail} from "./DocumentDetail"

export const MapToolBar = ({showAssets, filteredAssets, setFilterAssetById, setFilteredAssets, polyLine, setCriticalLinks, setPolyLine}) => {

    function handleCriticalCheckBox(e) {
        if(setCriticalLinks && setPolyLine){
            setCriticalLinks(e.target.checked)
            setPolyLine(false)
        }
    }

    function handleAssetSelect(e) {
        if(e === null) {
            setFilteredAssets(false)
            setFilterAssetById(false)
            return
        }
        if(setFilterAssetById) setFilterAssetById(e.value)
    }


    return <Card>
        <Card.Body>
            <React.Fragment>

                  <React.Fragment>
                    <Form.Text className="m-2">{SEARCH_ASSET_Label}</Form.Text>
                    <Select
                        placeholder={SEARCH_ASSET_PLACEHOLDER}
                        name="assets-select"
                        options={getAssetSelectOptions(showAssets)}
                        onChange={handleAssetSelect}
                        isClearable
                        classNamePrefix="select"
                    />
                </React.Fragment>

                <InputGroup className="mb-3 mt-3">
                    <InputGroup.Checkbox
                        title={CRITICAL_LINKS_TITLE}
                        onChange={handleCriticalCheckBox} />
                    <Form.Text className="m-2">{CRITICAL_LINKS}</Form.Text>
                </InputGroup>

                {filteredAssets && <DocumentDetail filteredAssets={filteredAssets}/>}

        </React.Fragment>
        </Card.Body>
    </Card>
}