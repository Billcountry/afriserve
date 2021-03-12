import React from "react"
import { Header, Body, Title, Left, Icon, Button, Drawer } from "native-base"
import { GlobalState, GlobalContext } from "../data/state"
import { HomePage } from "./home"

export class MainPage extends React.Component {
    static contextType = GlobalContext
    render() {
        const state: GlobalState = this.context
        return <>{state.main_screen === "home" && <HomePage />}</>
    }
}
