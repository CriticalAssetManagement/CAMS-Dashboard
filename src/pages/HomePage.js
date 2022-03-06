import React, {useState, useEffect} from "react"
import {Layout} from "../components/Layout"
import {ProgressBar, Button, Row} from "react-bootstrap"
import {Map} from "../components/Map"
import {WOQLClientObj} from '../init-woql-client'
import {QueryHook} from "../hooks/QueryHook"
import {getAvailableAssets, filterAssetsByIDQuery} from "../hooks/queries"
import {extractAssetLocations} from "../components/utils"
import {MapHook} from "../hooks/MapHook"
import {Table} from "../components/Table"
import {Legend} from "../components/Legend"
import {getCriticalAssetConfig} from "../components/Views"
import {DEPENDENCY_RELATION_TYPE_TITLE, HOME_PAGE_TABLE_CSS, NO_DEPENDENCY_ALERT, SEARCH_ASSET} from "./constants"
import {MapToolBar} from "../components/MapToolBar"
import {OffCanvasSideBar} from "../components/OffCanvasSideBar"
import {SearchBar} from "../components/SearchBar"
import {DisplayMarkerInfo} from "../components/DisplayMarkerInfo"

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
        onMarkerClick,
        setCriticalLinks,
        setPolyLine,
        setFilterAssetById,
        filteredAssets,
        setFilteredAssets
    } = MapHook(woqlClient, setLoading, setSuccessMsg, setErrorMsg)

    let queryResults = QueryHook(woqlClient, query, setLoading, setSuccessMsg, setErrorMsg)

    //console.log("filteredAssets", filteredAssets)
    //console.log("polyLine", JSON.stringify(polyLine, null, 2))

    useEffect(() => {
        if(!woqlClient) return
        let q = getAvailableAssets()
        setQuery(q)
    }, [woqlClient])

    useEffect(() => {
        if(queryResults.length) {
            //console.log("queryResults", queryResults)
            let locs = extractAssetLocations(queryResults)
            setShowAssets(locs)
            setLoading(false)
        }
    }, [queryResults])

    useEffect(() => {
        if(polyLine.length) setRefresh(Date.now())
    }, [polyLine])


    if(!showAssets && loading)
        return <ProgressBar animated now={100} variant="info"/>

    return <React.Fragment>
        <Layout/>


        {showAssets && <React.Fragment>

            <SearchBar placeholder={SEARCH_ASSET} setFilterAssetById={setFilterAssetById}/>

            {/*onMarkerClick && <h3 className="text-info mb-1"> {`Asset - ${onMarkerClick.name}`}</h3>*/}

            {onMarkerClick && <DisplayMarkerInfo dependencies={dependencies} info={onMarkerClick}/>}

            <Row>

                {!filteredAssets &&
                    <Map documents = {showAssets}
                        zoom={10}
                        setOnMarkerClick={setOnMarkerClick}
                        polyLine = {polyLine}
                    />
                }

                {filteredAssets &&
                    <Map documents = {filteredAssets}
                        zoom={10}
                        setOnMarkerClick={setOnMarkerClick}
                        polyLine = {polyLine}
                    />
                }

                {loading && <ProgressBar animated now={100} variant="info"/>}


            </Row>
        </React.Fragment>
        }



    </React.Fragment>
}

//{onMarkerClick && dependencies && <Legend/>}
/*

<Row className="text-break">
                {Array.isArray(dependencies) && dependencies.length && <React.Fragment>
                    <Table documents = {dependencies}
                        config={getCriticalAssetConfig(dependencies)}
                        title={DEPENDENCY_RELATION_TYPE_TITLE}
                        css={HOME_PAGE_TABLE_CSS}
                    />
                </React.Fragment>}
            </Row>
            */
