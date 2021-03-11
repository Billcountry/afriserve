import React from "react"
import { observer } from "mobx-react"
import { Container, StyleProvider } from "native-base"
import { GlobalState, GlobalContext } from "./src/data/state"
import firebase from "firebase"
import "firebase/app"
import "firebase/auth"
import { Login } from "./src/components/auth/login"
import { Splash } from "./src/components/splash"
import getTheme from "./native-base-theme/components/index"
import common from "./native-base-theme/variables/commonColor"

@observer
export default class App extends React.Component {
    globalState = new GlobalState()
    subscriber: any
    constructor(props: any) {
        super(props)
        if (!firebase.apps.length)
            firebase.initializeApp({
                apiKey: "AIzaSyD0dWoSbGls2jxSmafsxuee07Wfv0m2wT0",
                authDomain: "afriserve.firebaseapp.com",
                projectId: "afriserve",
                storageBucket: "afriserve.appspot.com",
                messagingSenderId: "563522401302",
                appId: "1:563522401302:web:aa2c0d383d12b8adb0f137",
                measurementId: "G-MJYZTK4KNG",
            })
    }
    componentDidMount() {
        this.subscriber = firebase.auth().onAuthStateChanged((user) => {
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
            <StyleProvider style={getTheme(common as any)}>
                <GlobalContext.Provider value={this.globalState}>
                    <Container>
                        {state.page === "splash" && <Splash />}
                        {state.page === "login" && <Login />}
                    </Container>
                </GlobalContext.Provider>
            </StyleProvider>
        )
    }
}
