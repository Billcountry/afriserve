import React from "react"
import { observer } from "mobx-react"
import { StyleSheet, View, Image, Text } from "react-native"
import { sharedStyles } from "../data/styles"

@observer
export class Error extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("../assets/logo.png")}
                />
                <Text style={sharedStyles.sectionTitle}>Afriserve Error</Text>
                <Text style={sharedStyles.sectionDescription}>
                    An error occurred while loading the application. Kindly
                    restart the app. If this problem persists contact
                    me@billcountry.tech.
                </Text>
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
