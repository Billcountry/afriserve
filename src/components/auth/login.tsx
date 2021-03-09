import React from "react"
import { observer } from "mobx-react"
import { StyleSheet, View, Image } from "react-native"
import { H2, Input } from "native-base"
import { GlobalContext } from "../../data/state"

@observer
export class Login extends React.Component {
    static contextType = GlobalContext
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("../../assets/logo.png")}
                />
                <H2>Afriserve Login</H2>
                <Input label="Phone Number" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
    },
    logo: {
        height: 160,
        width: 160,
    },
})
