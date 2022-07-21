import React, {useEffect, useState} from "react"
import {WOQLTable} from '@terminusdb/terminusdb-react-table'
import {ControlledGetDocumentQuery, ControlledDocuments} from '@terminusdb/terminusdb-react-table'
import {WOQLClientObj} from '../init-woql-client'
import {Alert} from "react-bootstrap"
import {INFO_VARIANT} from "./constants"
import {displayResults, getFormattedTime} from "./utils"
import {ASSET_TYPE, OWNER_TYPE, USER_TYPE, LINK_TYPE} from "../pages/constants"

export const Table = ({documents, config, type, css, csvConfig}) => {

    const {
        woqlClient,
        language
	} = WOQLClientObj()

    /*const { 
        changeOrder,
        changeLimits,
        limit,
        start,
        orderBy,
        loading, 
        documentResults,
        rowCount
    } = ControlledGetDocumentQuery(woqlClient, title, 10) */

    const { 
        changeOrder,
        changeLimits,
        limit,
        start,
        orderBy,
        loading,
        documentResults,
        rowCount
    } = ControlledDocuments(woqlClient, type, documents, 10)


    function getDocumentNotAvailableMessage(type) {
        if(type === ASSET_TYPE) return language.NO_ASSETS_AVAILBLE
        else if(type === OWNER_TYPE) return language.NO_OWNER_AVAILBLE
        else if(type === USER_TYPE) return language.NO_PERSON_AVAILABLE
        else if(type === LINK_TYPE) return language.NO_LINKS_AVAILABLE
        else return language.EMPTY_PLACEHOLDER
    }

    function displayEmptyMessage(type) {
        return <Alert variant={INFO_VARIANT}>
            {getDocumentNotAvailableMessage(type)}
        </Alert>
    }

    if(Array.isArray(documents) && documents.length === 0) {
        return <React.Fragment>{displayEmptyMessage(type) }</React.Fragment>
    }
    else if(!documents) return <React.Fragment>{displayEmptyMessage(type) }</React.Fragment>

    return <React.Fragment>
        <span className={css}>
            {config && <WOQLTable
                //result={displayResults(documentResults)}
                //result={type ? documentResults : documents}
                result={documents}
                freewidth={true}
                view={(config ? config.json() : {})}
                limit={limit}
                start={start}
                orderBy={orderBy}
                setLimits={changeLimits}
                setOrder={changeOrder} 
                query={false}
                loading={loading}
                totalRows={rowCount} 
                dowloadConfig={{filename: `${"file"}_${getFormattedTime()}.csv`, headers: csvConfig.headers,
                    headersLabel: csvConfig.labels}}
                //dowloadConfig={{filename:"test.csv", headers:["asset_identifier","assetType"]}}
            />}
        </span>
    </React.Fragment>
}
