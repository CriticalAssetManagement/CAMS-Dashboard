import React, {useEffect, useState} from "react"
import {WOQLTable} from '@terminusdb/terminusdb-react-table'
import {ControlledGetDocumentQuery, ControlledDocuments} from '@terminusdb/terminusdb-react-table'
import {WOQLClientObj} from '../init-woql-client'
import {Alert} from "react-bootstrap"
import {INFO_VARIANT} from "./constants"
import {displayResults, getFormattedTime} from "./utils"
import {ASSET_TYPE, OWNER_TYPE, USER_TYPE, LINK_TYPE} from "../pages/constants"
import { ListDocuments } from "./ListDocuments"

export const Table = ({documents, config, type, css, csvConfig}) => {
 
    
    return <ListDocuments/>
}
