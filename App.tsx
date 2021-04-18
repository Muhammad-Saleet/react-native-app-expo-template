import { StatusBar } from "expo-status-bar"
import React from "react"
import { SafeAreaView } from "react-native"
import { Provider } from "react-redux"
import { store } from "./src/redux/store"
import { RootNavigator } from "./src/navigation/RootNavigator"

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaView style={{ flex: 1 }}>
                {/*<QueryClientProvider client={queryClient}>*/}
                <RootNavigator />
                {/*</QueryClientProvider>*/}
                <StatusBar style="auto" />
            </SafeAreaView>
        </Provider>
    )
}
