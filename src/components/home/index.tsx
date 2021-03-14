import React from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react"
import {
    View,
    Text,
    Card,
    CardItem,
    Body,
    Button,
    Header,
    Icon,
    Title,
} from "native-base"
import { colors } from "../../data/styles"
import { GlobalContext, GlobalState } from "../../data/state"

@observer
export class HomePage extends React.Component {
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
                <View style={styles.container}>
                    <Card>
                        <CardItem header>
                            <Text style={styles.title}>Sales</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <View style={styles.flex}>
                                    <View style={styles.saleItem}>
                                        <Text style={styles.saleTitle}>
                                            Today
                                        </Text>
                                        <Text style={styles.saleText}>
                                            KES 10,000
                                        </Text>
                                    </View>
                                    <View style={styles.saleItem}>
                                        <Text style={styles.saleTitle}>
                                            Yesterday
                                        </Text>
                                        <Text style={styles.saleText}>
                                            KES 10,000
                                        </Text>
                                    </View>
                                </View>
                            </Body>
                        </CardItem>
                        <CardItem
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                            footer>
                            <Button
                                bordered
                                onPress={() => {
                                    state.main_screen = "sales"
                                }}>
                                <Text>View Sales</Text>
                            </Button>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text style={styles.title}>Customers</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <View style={styles.flex}>
                                    <View style={styles.saleItem}>
                                        <Text style={styles.saleTitle}>
                                            Total
                                        </Text>
                                        <Text style={styles.saleText}>10</Text>
                                    </View>
                                    <View style={styles.saleItem}>
                                        <Text style={styles.saleTitle}>
                                            Credit Offered
                                        </Text>
                                        <Text style={styles.saleText}>
                                            KES 10,000
                                        </Text>
                                    </View>
                                </View>
                            </Body>
                        </CardItem>
                        <CardItem
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                            footer>
                            <Button
                                bordered
                                onPress={() => {
                                    state.main_screen = "customers"
                                }}>
                                <Text>View Customers</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
    },
    flex: {
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
    },
    title: {
        color: colors.primary,
        fontSize: 24,
        textAlign: "center",
        margin: 10,
    },
    saleItem: {
        display: "flex",
        flexDirection: "column",
        width: "49%",
        backgroundColor: "#f1f1f1",
        margin: 5,
        borderRadius: 5,
        padding: 7,
    },
    saleTitle: {
        color: colors.primary,
        fontSize: 18,
    },
    saleText: {
        color: "#666666",
        fontSize: 22,
    },
})
