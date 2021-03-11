import { ReactChild } from "react"
import React from "react"
import { View } from "react-native"

interface CenterProps {
    children: ReactChild
}
export function Center(props: CenterProps) {
    return (
        <View
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
            {props.children}
        </View>
    )
}
