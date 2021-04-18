import { StatusBar } from "expo-status-bar"
import React, { ReactElement } from "react"
import { LogBox, SafeAreaView } from "react-native"
import { Provider } from "react-redux"
import { store } from "./src/redux/store"
import { RootNavigator } from "./src/navigation/RootNavigator"
import { QueryClientProvider, QueryClient } from "react-query"
LogBox.ignoreLogs(["Setting a timer"])

export default function App(): ReactElement {
    const queryClient = new QueryClient()

    return (
        <Provider store={store}>
            <SafeAreaView style={{ flex: 1 }}>
                <QueryClientProvider client={queryClient}>
                    <RootNavigator />
                </QueryClientProvider>
                <StatusBar style="auto" />
            </SafeAreaView>
        </Provider>
    )
}

