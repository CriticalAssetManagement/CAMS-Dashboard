import React, {useState, useEffect} from "react"
import {Form, Button} from "react-bootstrap"
import {BsSearch} from "react-icons/bs"
import AsyncSelect from 'react-select/async'
import {handleDocumentSelect} from "../components/utils"
import {SELECT_STYLES} from "./constants"

export const SearchBar = ({woqlClient, type, placeholder, setFilterAssetById}) => {

    function handleInput(e) {
        //e.preventDefault()
        if(setFilterAssetById) setFilterAssetById(e.target.value)
    }

    const loadOptions = async (inputValue, callback) => {
        //let opts = await onSelect(inputValue, frame[item])
        let opts = await handleDocumentSelect(woqlClient, inputValue, type)
        callback(opts)
        return opts
    }

    const handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        return inputValue
    }

    function onChange(e) {
        //props.onChange(e.value)
        if(setFilterAssetById) setFilterAssetById(e.value)
    }

    return <React.Fragment>
        <div className="search-bar d-flex">
            <AsyncSelect
                cacheOptions
                classNames="tdb__input search-asset-input"
                styles={SELECT_STYLES}
                placeholder={placeholder}
                onChange={onChange}
                loadOptions={loadOptions}
                onInputChange={handleInputChange}
            />
        </div>
    </React.Fragment>
}