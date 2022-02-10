import React, {useEffect, useState} from "react"
import {WOQLTable} from '@terminusdb-live/tdb-react-components'
import {ControlledGetDocumentQuery} from '@terminusdb-live/tdb-react-components'
import {WOQLClientObj} from '../init-woql-client'
import {Alert} from "react-bootstrap"
import {SECONDARY_VARIANT} from "./constants"


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
            No dependents available
        </Alert>
    }

    return <React.Fragment>
        {documents && <h5 className="text-info mb-3 mt-3"> {title}</h5>}
        <span className={css}>
            {config && <WOQLTable
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
            />}
        </span>
    </React.Fragment>
}