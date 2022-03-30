import React from "react"
import {Layout} from "../components/Layout"
import {REPORTS} from "../components/constants"

export const Reports = () => {
    return <div className="mb-5">
        <Layout/>
        {REPORTS}
    </div>
}