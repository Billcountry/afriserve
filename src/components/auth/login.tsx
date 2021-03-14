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
import { getValidPhone } from "../../utils"

interface LoginState {
    phone: string
    code: string
    loading: boolean
    codeRequested: boolean
    confirm: FirebaseAuthTypes.ConfirmationResult | null
}

@observer
export class Login extends React.Component<any, LoginState> {
    static contextType = GlobalContext
    constructor(props: any) {
        super(props)
        this.state = {
            phone: "",
            code: "",
            loading: false,
            codeRequested: false,
            confirm: null,
        }
    }

    startSignIn() {
        const phone = getValidPhone(this.state.phone)
        if (phone === null) {
            Toast.show({
                text: "Please enter a valid phone number",
                buttonText: "Ok",
                type: "danger",
                duration: 5000,
            })
            return
        }
        this.setState({ loading: true })

        auth()
            .signInWithPhoneNumber(phone)
            .then((confirm) => {
                this.setState({ confirm, codeRequested: true, loading: false })
                Toast.show({
                    text: "Confirmation code sent to your phone",
                    buttonText: "Ok",
                    type: "success",
                    duration: 6000,
                })
            })
            .catch((err: FirebaseAuthTypes.PhoneAuthError) => {
                this.setState({ loading: false })
                Toast.show({
                    text: `${err.message}`,
                    duration: 7500,
                    type: "warning",
                    buttonText: "Ok",
                })
            })
    }

    completeLogin() {
        const { confirm, code } = this.state
        this.setState({ loading: true })

        confirm
            ?.confirm(code)
            .catch((err: FirebaseAuthTypes.PhoneAuthError) => {
                Toast.show({
                    text: `${err.message}`,
                    duration: 7500,
                    type: "danger",
                    buttonText: "Ok",
                })
            })
    }
    render() {
        const { phone, codeRequested, code, loading } = this.state
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
                    Afriserve
                </Text>

                <Content style={styles.loginForm}>
                    <Form>
                        <Item floatingLabel>
                            <Label style={sharedStyles.sectionDescription}>
                                Enter your phone number to continue
                            </Label>
                            <Input
                                value={phone}
                                style={{ fontSize: 24, marginTop: 16 }}
                                textContentType="telephoneNumber"
                                onChangeText={(text) =>
                                    this.setState({ phone: text })
                                }
                                disabled={codeRequested || loading}
                                placeholder="0712 345 678"
                            />
                        </Item>

                        {codeRequested && (
                            <Item floatingLabel>
                                <Label style={sharedStyles.sectionDescription}>
                                    Code sent to your phone
                                </Label>
                                <Input
                                    value={code}
                                    style={{
                                        fontSize: 24,
                                        marginTop: 16,
                                        textAlign: "center",
                                    }}
                                    textContentType="oneTimeCode"
                                    onChangeText={(text) =>
                                        this.setState({ code: text })
                                    }
                                    disabled={loading}
                                />
                            </Item>
                        )}

                        {loading && (
                            <Center>
                                <Spinner color={colors.primary} />
                            </Center>
                        )}

                        {!codeRequested && !loading && (
                            <Button
                                style={{ margin: 10 }}
                                onPress={this.startSignIn.bind(this)}
                                primary
                                block>
                                <Text>Continue</Text>
                            </Button>
                        )}
                        {codeRequested && !loading && (
                            <Button
                                style={{ margin: 10 }}
                                onPress={this.completeLogin.bind(this)}
                                primary
                                block>
                                <Text>Login</Text>
                            </Button>
                        )}
                        {codeRequested && !loading && (
                            <Button
                                style={{ margin: 10 }}
                                onPress={() =>
                                    this.setState({
                                        phone: "",
                                        codeRequested: false,
                                    })
                                }
                                transparent
                                block>
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
