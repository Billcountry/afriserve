import React from "react"
import { SafeAreaView, StatusBar } from "react-native"
import { GlobalState, GlobalContext } from "./src/data/state"
import auth from "@react-native-firebase/auth"
import { Login } from "./src/components/auth/login"
import { Splash } from "./src/components/splash"

export default class App extends React.Component {
    globalState = new GlobalState()
    subscriber: any
    componentDidMount() {
        this.subscriber = auth().onAuthStateChanged((user) => {
            this.globalState.authorized = user
            if (user === null) {
                this.globalState.page = "login"
                this.globalState.loading = false
            }
        })
    }
    componentWillUnmount() {
        if (this.subscriber) this.subscriber()
    }
    render() {
        const state = this.globalState
        return (
            <GlobalContext.Provider value={this.globalState}>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    {state.page === "splash" && <Splash />}
                    {state.page === "login" && <Login />}
                </SafeAreaView>
            </GlobalContext.Provider>
        )
    }
}
