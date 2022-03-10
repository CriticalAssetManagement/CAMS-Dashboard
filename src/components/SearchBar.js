import React, {useState, useEffect} from "react"
import {Form, Card} from "react-bootstrap"
import {BsSearch} from "react-icons/bs"

export const SearchBar = ({placeholder, setFilterAssetById}) => {

    function handleInput(e) {
        //e.preventDefault()
        if(setFilterAssetById) setFilterAssetById(e.target.value)
    }

    return <React.Fragment>
        <Form className="col-md-3 search-bar d-flex">
            <Form.Control type="text" placeholder={placeholder} className="border-0" onBlur={handleInput}/>
            <BsSearch className="col-md-1 m-3"/>
        </Form>
    </React.Fragment>
}