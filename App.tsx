import React from "react"
import { observer } from "mobx-react"
import { Container, StyleProvider, Root } from "native-base"
import { GlobalState, GlobalContext } from "./src/data/state"
import { Login } from "./src/components/auth/login"
import { Splash } from "./src/components/splash"
import getTheme from "./native-base-theme/components/index"
import common from "./native-base-theme/variables/commonColor"
import auth from "@react-native-firebase/auth"

@observer
export default class App extends React.Component {
    globalState = new GlobalState()
    subscriber: any
    componentDidMount() {
        this.subscriber = auth().onAuthStateChanged((user) => {
            this.globalState.authorized = user
            if (user === null) {
                this.globalState.page = "login"
                this.globalState.loading = false
                return
            }
            // Set the page to splash and check if the user exists in firebase.
            this.globalState.page = "splash"
            this.globalState.loading = true
        })
    }
    componentWillUnmount() {
        if (this.subscriber) this.subscriber()
    }
    render() {
        const state = this.globalState
        return (
            <Root>
                <StyleProvider style={getTheme(common as any)}>
                    <GlobalContext.Provider value={this.globalState}>
                        <Container>
                            {state.page === "splash" && <Splash />}
                            {state.page === "login" && <Login />}
                        </Container>
                    </GlobalContext.Provider>
                </StyleProvider>
            </Root>
        )
    }
}
