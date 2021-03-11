import React from "react"
import { observer } from "mobx-react"
import { StyleSheet, Image, View } from "react-native"
import {
    Input,
    Content,
    Form,
    Item,
    Label,
    Button,
    Text,
    Toast,
    Spinner,
} from "native-base"
import { GlobalContext } from "../../data/state"
import { sharedStyles, colors } from "../../data/styles"
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { Center } from "../shared"

interface LoginState {
    name: string
    loading: boolean
}

@observer
export class Register extends React.Component<any, LoginState> {
    static contextType = GlobalContext
    constructor(props: any) {
        super(props)
        this.state = {
            name: "",
            loading: false,
        }
    }

    render() {
        const { name, loading } = this.state
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
                    Complete Profile
                </Text>

                <Content style={styles.loginForm}>
                    <Form>
                        <Item floatingLabel>
                            <Label style={sharedStyles.sectionDescription}>
                                Full Name
                            </Label>
                            <Input
                                value={name}
                                style={{ fontSize: 24, marginTop: 16 }}
                                textContentType="name"
                                onChangeText={(text) =>
                                    this.setState({ name: text })
                                }
                                disabled={loading}
                            />
                        </Item>

                        {loading && (
                            <Center>
                                <Spinner color={colors.primary} />
                            </Center>
                        )}

                        {!loading && (
                            <Button style={{ margin: 10 }} primary block>
                                <Text>Reset</Text>
                            </Button>
                        )}
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
        marginTop: 32,
    },
    loginForm: {
        alignSelf: "stretch",
    },
})
