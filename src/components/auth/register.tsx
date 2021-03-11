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
    ListItem,
    CheckBox,
    Body,
} from "native-base"
import { GlobalContext } from "../../data/state"
import { sharedStyles, colors } from "../../data/styles"
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { Center } from "../shared"

interface LoginState {
    name: string
    shopName: string
    address: string
    terms: boolean
    loading: boolean
}

@observer
export class Register extends React.Component<any, LoginState> {
    static contextType = GlobalContext
    constructor(props: any) {
        super(props)
        this.state = {
            name: "",
            shopName: "",
            address: "",
            terms: false,
            loading: false,
        }
    }

    render() {
        const { name, shopName, address, terms, loading } = this.state
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("../../assets/logo.png")}
                />
                <Text
                    style={{
                        ...sharedStyles.sectionDescription,
                        textAlign: "center",
                    }}>
                    Complete your profile to continue
                </Text>

                <Content style={styles.loginForm}>
                    <Form>
                        <Item floatingLabel>
                            <Label style={sharedStyles.sectionDescription}>
                                Your Name
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

                        <Item floatingLabel>
                            <Label style={sharedStyles.sectionDescription}>
                                Shop Name
                            </Label>
                            <Input
                                value={shopName}
                                style={{ fontSize: 24, marginTop: 16 }}
                                textContentType="name"
                                onChangeText={(text) =>
                                    this.setState({ shopName: text })
                                }
                                disabled={loading}
                            />
                        </Item>

                        <Item floatingLabel>
                            <Label style={sharedStyles.sectionDescription}>
                                Shop's Street Address
                            </Label>
                            <Input
                                value={address}
                                style={{ fontSize: 18, marginTop: 16 }}
                                textContentType="streetAddressLine1"
                                onChangeText={(text) =>
                                    this.setState({ address: text })
                                }
                                disabled={loading}
                            />
                        </Item>

                        <ListItem>
                            <CheckBox checked={terms} color={colors.primary} onPress={()=>this.setState({terms: !terms})} />
                            <Body>
                                <Text>By completing registration you agree with Terms of Service and Privacy policy</Text>
                            </Body>
                        </ListItem>

                        {loading && (
                            <Center>
                                <Spinner color={colors.primary} />
                            </Center>
                        )}

                        {!loading && (
                            <Button style={{ margin: 10 }} primary block>
                                <Text>Register Shop</Text>
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
