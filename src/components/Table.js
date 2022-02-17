import React, {useEffect, useState} from "react"
import {WOQLTable} from '@terminusdb-live/terminusdb-react-table'
import {ControlledGetDocumentQuery} from '@terminusdb-live/terminusdb-react-table'
import {WOQLClientObj} from '../init-woql-client'
import {Alert} from "react-bootstrap"
import {SECONDARY_VARIANT} from "./constants"
import {displayResults} from "./utils"


export const Table = ({documents, config, title, css}) => {

    const {
        woqlClient
	} = WOQLClientObj()

    const {
        changeOrder,
        changeLimits,
        limit,
        start,
        orderBy,
        loading,
        rowCount
    } = ControlledGetDocumentQuery(woqlClient, null, 10)

    if(Array.isArray(documents) && documents.length === 0) {
        return <Alert variant={SECONDARY_VARIANT}>
           {` No ${title} available`}
        </Alert>
    }


    return <React.Fragment>
        <span className={css}>
            {config && <WOQLTable
                result={displayResults(documents)}
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
            />}
        </span>
    </React.Fragment>
}