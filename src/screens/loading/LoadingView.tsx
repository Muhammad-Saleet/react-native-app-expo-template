import React, { ReactElement } from "react"
import { View, ActivityIndicator } from "react-native"

export function LoadingView ():ReactElement {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
        >
            <ActivityIndicator
                color={"blue"}
                size="large"
            />
        </View>
    )
}
