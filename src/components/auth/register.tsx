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
import { GlobalContext, GlobalState } from "../../data/state"
import { sharedStyles, colors } from "../../data/styles"
import { uniqueId } from "../../utils"
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { Center } from "../shared"
import { Shop, ShopUser } from "../../data/shop"

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

    completeRegistration() {
        const { name, shopName, address, terms } = this.state
        const state: GlobalState = this.context
        let error = ""
        if (name.length < 3) {
            error = "Please provide your name"
        } else if (shopName.length < 3) {
            error = "Please provide the name of your shop"
        } else if (address.length < 5) {
            error = "Please provide the street address of your shop"
        } else if (!terms) {
            error =
                "You're required to accept the terms and conditions before proceeding"
        }
        if (error) {
            Toast.show({
                text: error,
                buttonText: "Ok",
                type: "danger",
                duration: 5000,
            })
            return
        }

        this.setState({ loading: true })

        const handler = (err: Error) => {
            console.log(err)
            state.page = "error"
        }

        // Add name to the user
        state.authorized
            ?.updateProfile({ displayName: name })
            .then(() => {
                // Create a shop.
                const shop = new Shop(uniqueId())
                shop.name = shopName
                shop.address = address
                shop.update()
                    .then(() => {
                        // Create a shop user
                        const user = new ShopUser(uniqueId())
                        user.shopId = shop.doc.id
                        if (state.authorized !== null)
                            user.userId = state.authorized.uid
                        user.update()
                            .then(() => {
                                state.page = "activate"
                            })
                            .catch(handler)
                    })
                    .catch(handler)
            })
            .catch(handler)
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
                    Just a few more details...
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
                            <CheckBox
                                checked={terms}
                                color={colors.primary}
                                onPress={() => this.setState({ terms: !terms })}
                            />
                            <Body>
                                <Text>
                                    By completing registration you agree with
                                    Terms of Service and Privacy policy
                                </Text>
                            </Body>
                        </ListItem>

                        {loading && (
                            <Center>
                                <Spinner color={colors.primary} />
                            </Center>
                        )}

                        {!loading && (
                            <Button
                                style={{ margin: 10 }}
                                onPress={this.completeRegistration.bind(this)}
                                primary
                                block>
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
