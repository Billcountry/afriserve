import React from "react"
import { observer } from "mobx-react"
import { StyleSheet, Image, View } from "react-native"
import { Input, Content, Form, Item, Label, Button, Text } from "native-base"
import { GlobalContext } from "../../data/state"
import { sharedStyles } from "../../data/styles"

interface LoginState {
    phone: string
}

@observer
export class Login extends React.Component<any, LoginState> {
    static contextType = GlobalContext
    constructor(props: any) {
        super(props)
        this.state = {
            phone: "+254",
        }
    }
    render() {
        const { phone } = this.state
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("../../assets/logo.png")}
                />
                <Text
                    style={{
                        ...sharedStyles.sectionTitle,
                        textAlign: "center",
                    }}>
                    Afriserve Account
                </Text>

                <Content style={styles.loginForm}>
                    <Form>
                        <Item stackedLabel>
                            <Label style={sharedStyles.sectionDescription}>
                                Enter your phone number to continue
                            </Label>
                            <Input value={phone} />
                        </Item>

                        <Button style={{ margin: 10 }} primary block>
                            <Text>Continue</Text>
                        </Button>
                    </Form>
                </Content>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "stretch",
        justifyContent: "flex-start",
        flexDirection: "column",
    },
    logo: {
        height: 160,
        width: 160,
        alignSelf: "center",
    },
    loginForm: {
        alignSelf: "stretch",
    },
})
