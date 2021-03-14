import React from "react"
import { observer } from "mobx-react"
import { Modal } from "react-native"
import {
    View,
    Form,
    Input,
    Item,
    Label,
    Text,
    Button,
    Spinner,
    Toast,
} from "native-base"
import { colors, sharedStyles } from "../../data/styles"
import { GlobalContext, GlobalState } from "../../data/state"
import { getValidPhone } from "../../utils"

@observer
export class AddCustomer extends React.Component {
    static contextType = GlobalContext
    save() {
        const state: GlobalState = this.context
        const shop = state.shop
        if (shop === null) return
        const customer = state.editCustomer
        if (customer === null) return
        const phone = getValidPhone(customer.Phone)
        if (phone === null) {
            Toast.show({
                text: "Invalid phone number",
                type: "danger",
                duration: 4500,
            })
            return
        }

        customer.ShopId = shop.doc.id
        customer.Phone = phone
        customer.loading = true
        const create_or_update = () => {
            customer
                .update()
                .then(() => {
                    state.editCustomer = null
                })
                .catch((err) => {
                    console.log({ err })
                    Toast.show({
                        text: `An error occurred please retry.`,
                        type: "warning",
                        duration: 4500,
                    })
                    customer.loading = false
                })
        }
        if (customer.exists) {
            create_or_update()
            return
        }
        // This customer is a new one. Confirm if the phone number already exists
        shop.hasPhone(phone).then((existingCustomer) => {
            if (existingCustomer === null) {
                create_or_update()
                return
            }
            state.editCustomer = null
            Toast.show({
                text: `Not adding ${phone}. Phone number already exists.`,
                type: "warning",
                duration: 4500,
            })
        })
    }
    render() {
        const state: GlobalState = this.context
        const customer = state.editCustomer
        if (customer === null) return null
        return (
            <Modal
                transparent
                visible={true}
                onRequestClose={() => (state.editCustomer = null)}>
                <View
                    onTouchEnd={() => (state.editCustomer = null)}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "stretch",
                        backgroundColor: "#00000080",
                    }}>
                    <View
                        onTouchEnd={(evt) => {
                            evt.stopPropagation()
                        }}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "stretch",
                            backgroundColor: "#ffffff",
                            margin: 5,
                            borderRadius: 10,
                            padding: 10,
                        }}>
                        <Text
                            style={{
                                ...sharedStyles.sectionTitle,
                                textAlign: "center",
                            }}>
                            Customer
                        </Text>
                        <Form
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}>
                            <Item floatingLabel>
                                <Label>Name</Label>
                                <Input
                                    disabled={customer.loading}
                                    value={customer.Name}
                                    onChangeText={(text) =>
                                        (customer.Name = text)
                                    }
                                />
                            </Item>
                            <Item
                                floatingLabel
                                error={Boolean(
                                    !customer.phoneValid && customer.Phone
                                )}>
                                <Label>Phone Number</Label>
                                <Input
                                    disabled={customer.loading}
                                    value={customer.Phone}
                                    onChangeText={(text) =>
                                        (customer.Phone = text)
                                    }
                                />
                            </Item>
                        </Form>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: 10,
                            }}>
                            {!customer.loading && (
                                <Button
                                    onPress={this.save.bind(this)}
                                    style={{
                                        alignSelf: "center",
                                        minWidth: 160,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                    {customer.exists && <Text>Save</Text>}
                                    {!customer.exists && <Text>Add</Text>}
                                </Button>
                            )}
                            {customer.loading && (
                                <Spinner color={colors.primary} />
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}
