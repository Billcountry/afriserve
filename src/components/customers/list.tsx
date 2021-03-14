import React from "react"
import { observer } from "mobx-react"
import { BackHandler, NativeEventSubscription } from "react-native"
import firestore, {
    FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore"
import {
    View,
    Header,
    Button,
    Icon,
    Body,
    Title,
    Fab,
    List,
    ListItem,
    Text,
} from "native-base"
import { AddCustomer } from "./add"
import { GlobalContext, GlobalState } from "../../data/state"
import { Customer } from "../../data/customers"
import { colors } from "../../data/styles"
import { uniqueId } from "../../utils"

interface CustomersListState {
    customers: { [key: string]: Customer }
    filter: string
}

@observer
export class CustomersList extends React.Component<any, CustomersListState> {
    static contextType = GlobalContext
    subscription: any
    backHandler: any
    constructor(props: any) {
        super(props)
        this.state = {
            customers: {},
            filter: "",
        }
    }

    componentDidMount() {
        const state: GlobalState = this.context
        const query = firestore()
            .collection(`${Customer.name}s`)
            .where("ShopId", "==", state.shop?.doc.id)
        const processSnapshot = (
            querySnapshot: FirebaseFirestoreTypes.QuerySnapshot
        ) => {
            const { customers } = this.state
            querySnapshot.docChanges().forEach((change) => {
                if (change.type === "removed") {
                    if (customers[change.doc.id]) {
                        delete customers[change.doc.id]
                    }
                }
                if (change.type === "added") {
                    if (customers[change.doc.id] === undefined) {
                        customers[change.doc.id] = new Customer(
                            change.doc.id,
                            change.doc
                        )
                    }
                }
                this.setState({ customers })
            })
        }
        this.subscription = query.onSnapshot(processSnapshot)
        query.get().then(processSnapshot)
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                state.main_screen = "home"
                return true
            }
        )
    }

    componentWillUnmount() {
        this.subscription()
        this.backHandler.remove()
    }

    render() {
        const state: GlobalState = this.context
        const { customers } = this.state
        return (
            <>
                <Header>
                    <Button transparent>
                        <Icon name="chevron-back" />
                    </Button>
                    <Body>
                        <Title>Customers</Title>
                    </Body>
                </Header>
                <View style={{ flex: 1 }}>
                    <List>
                        {Object.values(customers).map((customer) => {
                            return (
                                <ListItem
                                    style={{
                                        display: "flex",
                                    }}
                                    key={customer.doc.id}>
                                    <Icon
                                        style={{
                                            fontSize: 36,
                                            marginRight: 10,
                                        }}
                                        name="person"
                                    />
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}>
                                        <Text
                                            style={{
                                                color: "#444444",
                                                alignSelf: "flex-start",
                                                fontSize: 18,
                                            }}>
                                            {customer.Name}
                                        </Text>
                                        <Text
                                            style={{
                                                color: "#666666",
                                                alignSelf: "flex-start",
                                            }}>
                                            {customer.Phone}
                                        </Text>
                                    </View>
                                </ListItem>
                            )
                        })}
                    </List>
                    <Fab
                        position="bottomRight"
                        onPress={() => {
                            state.editCustomer = new Customer(uniqueId())
                        }}
                        style={{ backgroundColor: colors.primary }}>
                        <Icon name="person-add" />
                    </Fab>
                    <AddCustomer />
                </View>
            </>
        )
    }
}
