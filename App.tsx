import React from "react"
import { SafeAreaView, StatusBar } from "react-native"

export default class App extends React.Component {
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView></SafeAreaView>
            </>
        )
    }
}
