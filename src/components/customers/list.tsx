import React from "react"
import { View, List, Header, Button, Icon, Body, Title } from "native-base"
import { GlobalContext, GlobalState } from "../../data/state"

export class CustomersList extends React.Component {
    static contextType = GlobalContext
    render() {
        const state: GlobalState = this.context
        return (
            <>
                <Header>
                    <Button transparent>
                        <Icon name="menu" />
                    </Button>
                    <Body>
                        <Title>{state.shop?.Name}</Title>
                    </Body>
                </Header>
            </>
        )
    }
}
