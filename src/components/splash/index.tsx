import React from "react"
import { observer } from "mobx-react"
import { StyleSheet, View, Image } from "react-native"
import { H2, Spinner } from "native-base"
import { GlobalState, GlobalContext } from "../../data/state"

@observer
export class Splash extends React.Component {
    static contextType = GlobalContext
    render() {
        const state: GlobalState = this.context
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("../../assets/logo.png")}
                />
                <H2>Afriserve</H2>
                {state.loading && <Spinner color="#795548" />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    logo: {
        height: 160,
        width: 160,
    },
})
