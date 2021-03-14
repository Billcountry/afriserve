import React from "react"
import { observer } from "mobx-react"
import { GlobalState, GlobalContext } from "../data/state"
import { HomePage } from "./home"
import { CustomersList } from "./customers/list"

@observer
export class MainPage extends React.Component {
    static contextType = GlobalContext
    render() {
        const state: GlobalState = this.context
        return (
            <>
                {state.main_screen === "home" && <HomePage />}
                {state.main_screen === "customers" && <CustomersList />}
            </>
        )
    }
}
