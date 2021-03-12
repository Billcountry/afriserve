import React from "react"
import { observer } from "mobx-react"
import { Container, StyleProvider, Root } from "native-base"
import { GlobalState, GlobalContext } from "./src/data/state"
import { Login } from "./src/components/auth/login"
import { Register } from "./src/components/auth/register"
import { Splash } from "./src/components/splash"
import { Error } from "./src/components/error"
import { Activation } from "./src/components/activate"
import { MainPage } from "./src/components"
import getTheme from "./native-base-theme/components/index"
import common from "./native-base-theme/variables/commonColor"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { Shop, ShopUser } from "./src/data/shop"

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
                this.globalState.shop = null
                return
            }
            // Set the page to splash and check if the user exists in firebase.
            this.globalState.page = "splash"
            this.globalState.loading = true
            this.guessPage()
        })
    }
    componentWillUnmount() {
        if (this.subscriber) this.subscriber()
    }
    guessPage() {
        const user = this.globalState.authorized
        if (user === null) return
        // Check if the user belongs to a shop and if the shop is activated.
        firestore()
            .collection("ShopUsers")
            .where("UserId", "==", user.uid)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.size) {
                    // User already belongs to a shop. Login to the top shop
                    const snapshot = querySnapshot.docs[0]
                    const shopUser = new ShopUser(snapshot.id, snapshot)
                    this.globalState.shop = new Shop(shopUser.ShopId)
                    this.globalState.page = "main"
                } else {
                    // Take user to the registration page
                    this.globalState.page = "register"
                }
            })
            .catch((err) => {
                console.log({ err })
                //Maybe show an error page
                this.globalState.page = "error"
            })
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
                            {state.page === "register" && <Register />}
                            {state.page === "error" && <Error />}
                            {Boolean(
                                state.shop &&
                                    state.shop.Verified &&
                                    state.page === "main"
                            ) && <MainPage />}
                            {Boolean(
                                state.shop &&
                                    !state.shop.Verified &&
                                    state.page === "main"
                            ) && <Activation />}
                        </Container>
                    </GlobalContext.Provider>
                </StyleProvider>
            </Root>
        )
    }
}
