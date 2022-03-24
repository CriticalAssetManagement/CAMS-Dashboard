import React, {useState, useEffect} from "react"
import AsyncSelect from 'react-select/async'
import {handleDocumentSelect} from "../components/utils"
import {SELECT_STYLES} from "./constants"

export const SearchBar = ({woqlClient, type, placeholder, setFilterAssetById, resetMap}) => {

    const [inputValue, setInputValue]=useState(null) // select value
    const [value, setValue]=useState(null) // select value


    const loadOptions = async (inputValue, callback) => {
        //let opts = await onSelect(inputValue, frame[item])
        let opts = await handleDocumentSelect(woqlClient, inputValue, type)
        callback(opts)
        return opts
    }

    const handleInputChange = (newValue) => {
        const inp = newValue.replace(/\W/g, '')
        //console.log("inp", inp)
        setInputValue(inp)
        return inp
    }

    function onChange(e) {
        //props.onChange(e.value)
        if(setFilterAssetById) setFilterAssetById(e.value)
        setValue({value:e.value, label: e.label})
    }

    useEffect(() => {
        if(resetMap) setValue(null)
    }, [resetMap])

    return <React.Fragment>
        <div className="search-bar d-flex">
            <AsyncSelect
                //cacheOptions
                classNames="tdb__input search-asset-input"
                styles={SELECT_STYLES}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                loadOptions={loadOptions}
                //inputValue={inputValue}
                onInputChange={handleInputChange}
            />
        </div>
    </React.Fragment>
}