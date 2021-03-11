import React from "react"
import { View, Text } from "react-native"
import { Header, Body, Title } from "native-base"
import { GlobalState, GlobalContext } from "../data/state"

export class MainPage extends React.Component {
    static contextType = GlobalContext
    render() {
        const state: GlobalState = this.context
        return [
            <Header key="header">
                <Body>
                    <Title>{state.shop?.name}</Title>
                </Body>
            </Header>,
            <View key="content">
                <Text>Here is the fucking home page</Text>
            </View>,
        ]
    }
}
