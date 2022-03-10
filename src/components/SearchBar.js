import React, {useState, useEffect} from "react"
import {Form, Button} from "react-bootstrap"
import {BsSearch} from "react-icons/bs"

export const SearchBar = ({placeholder, setFilterAssetById}) => {

    function handleInput(e) {
        //e.preventDefault()
        if(setFilterAssetById) setFilterAssetById(e.target.value)
    }

    return <React.Fragment>
        <div className="search-bar d-flex">
            <Form.Control type="text" placeholder={placeholder} className="form-control border-0" onBlur={handleInput}/>
            <Button variant="outline-success" className="col-md-1 btn-sm border-0">
                <BsSearch className=" m-2 search-button text-muted fw-bold"/>
            </Button>
        </div>
    </React.Fragment>
}