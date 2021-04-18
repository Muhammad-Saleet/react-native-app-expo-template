import * as React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { HomeView } from "../screens/home/HomeView"

export function HomeStack () {
    const AgentStackNav = createStackNavigator()

    return (
        <AgentStackNav.Navigator
            initialRouteName="HomeView"
        >
            <AgentStackNav.Screen
                name="HomeView"
                component={HomeView}
            />
        </AgentStackNav.Navigator>
    )
}
