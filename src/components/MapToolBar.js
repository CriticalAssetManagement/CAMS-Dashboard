import React, {useState, useEffect} from "react"
import {Card, Form, InputGroup} from "react-bootstrap"
import Dropdown from 'react-bootstrap/Dropdown'
import {CRITICAL_LINKS_TITLE, CRITICAL_LINKS, SEARCH_ASSET_Label, SEARCH_ASSET_PLACEHOLDER, HAZARD_TYPE, HAZARD_DROPDOWN_TITLE} from "./constants"
import Select from 'react-select'
import {getAssetSelectOptions} from "./utils"
import {DocumentDetail} from "./DocumentDetail"
import {WOQLClientObj} from '../init-woql-client'


export const MapToolBar = ({showAssets, filteredAssets, setFilterAssetById, setFilteredAssets, polyLine, setCriticalLinks, setPolyLine}) => {

    const {
        prefix,
        frames
	} = WOQLClientObj()

    const [eventList, setEventList] = useState(false)
    const [selectedEvents, setSelectedEvents] = useState([])

    function handleClicked (e) {

        let current = e.target.value

        let arr=selectedEvents
        if(arr.includes(current)) {
            for( var i = 0; i < arr.length; i++){
                if ( arr[i] === current) {
                    arr.splice(i, 1)
                    i--
                }
            }
            setSelectedEvents(arr)
        }
        else {
            setSelectedEvents(events => [...events, e.target.value])
        }

        //setSelectedEvents(events => [...events, e.target.value])
    }


    console.log("selectedEvents", selectedEvents)

    useEffect(() => {
        if(Object.keys(frames).length) {
            let type = `${prefix}${HAZARD_TYPE}`
            let list = frames[type]["@values"]
            let listArray=[], selectedEvents={}
            list.map(lst => {
                listArray.push(
                    <div className="m-1">
                        <input type="checkbox" id={lst} name={lst} value={lst} onChange={handleClicked}/>
                        <label for={lst}>{lst}</label> <br/>
                    </div>
                )
            })

            setEventList(listArray)
        }
    }, [frames])

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

                    {/*<Select
                        placeholder={SEARCH_ASSET_PLACEHOLDER}
                        name="assets-select"
                        options={getAssetSelectOptions(showAssets)}
                        onChange={handleAssetSelect}
                        isClearable
                        className="col-md-6"
                        classNamePrefix="select"
                    /> */}

                <Dropdown>

                <Dropdown.Toggle variant="outline-success" id="dropdown-basic" >
                    {HAZARD_DROPDOWN_TITLE}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {eventList && eventList}
                </Dropdown.Menu>
                </Dropdown>


        </React.Fragment>
        </Card.Body>
    </Card>
}

/**
 * let hazard = "@schema:Hazard/Pest%20Infestations"
triple("v:Assets", "@schema:applicable_hazards", hazard)
str.replace(/%20/g, " ");
 */