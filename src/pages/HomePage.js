import React, {useState, useEffect} from "react"
import {Layout} from "../components/Layout"
import {Container, ProgressBar, Row} from "react-bootstrap"
import {Map} from "../components/Map"
import {WOQLClientObj} from '../init-woql-client'
import {QueryHook} from "../hooks/QueryHook"
import {getAvailableAssets} from "../hooks/queries"
import {extractAssetLocations} from "../components/utils"
import {MapHook} from "../hooks/MapHook"
import {Table} from "../components/Table"
import {Legend} from "../components/Legend"
import {getCriticalAssetConfig} from "../components/Views"
import {DEPENDENCY_RELATION_TYPE_TITLE, HOME_PAGE_TABLE_CSS, NO_DEPENDENCY_ALERT} from "./constants"
import {Status} from "../components/Status"

export const HomePage = () => {
    const [query, setQuery] = useState(false)
    const [showAssets, setShowAssets] = useState(false)
    const [refresh, setRefresh]=useState(false)

    const {
        woqlClient,
        setSuccessMsg,
        setErrorMsg,
        loading,
        setLoading,
	} = WOQLClientObj()

    const {
        setOnMarkerClick,
        polyLine,
        dependencies,
        onMarkerClick
    } = MapHook(woqlClient, setLoading, setSuccessMsg, setErrorMsg)

    let queryResults = QueryHook(woqlClient, query, setSuccessMsg, setErrorMsg)

    useEffect(() => {
        if(!woqlClient) return
        let q = getAvailableAssets()
        setQuery(q)
    }, [woqlClient])

    useEffect(() => {
        if(queryResults.length) {
            let locs = extractAssetLocations(queryResults)
            setShowAssets(locs)
            setLoading(false)
        }
    }, [queryResults])

    useEffect(() => {
        if(polyLine.length) setRefresh(Date.now())
    }, [polyLine])

    console.log("polyLine", polyLine)
    return <Container fluid="lg" className="mt-5 mb-5">
        <Layout/>
        <div className="mt-5 mb-5">
            {showAssets && <React.Fragment>
                {onMarkerClick && <h3 className="text-info mb-1"> {`Asset - ${onMarkerClick.name}`}</h3>}
                <Row className="m-2">
                    <Map documents = {showAssets}
                        zoom={13}
                        setOnMarkerClick={setOnMarkerClick}
                        polyLine = {polyLine}
                    />
                    {loading && <ProgressBar animated now={100} variant="info"/>}
                    {dependencies && <Legend/>}
                </Row>
                <Row className="text-break">
                    {Array.isArray(dependencies) && dependencies.length && <React.Fragment>
                        <Status documents = {dependencies} onMarkerClick={onMarkerClick}/>
                        <Table documents = {dependencies}
                            config={getCriticalAssetConfig(dependencies)}
                            title={DEPENDENCY_RELATION_TYPE_TITLE}
                            css={HOME_PAGE_TABLE_CSS}/>
                    </React.Fragment>}
                </Row>
            </React.Fragment>
            }
        </div>
    </Container>
}