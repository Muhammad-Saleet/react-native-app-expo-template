import React, { useEffect, useRef } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationManager, navigationRef } from "./NavigationManager"
import { useSelector } from "react-redux"
import { AuthStack } from "./AuthStack"
import { BottomTabs } from "./BottomTabs"
import { LoadingView } from "../screens/loading/LoadingView"

export function RootNavigator () {
    const token = useSelector((state) => state?.auth?.token)
    const showLoadingScreen = useSelector((state) => state?.app?.showLoadingScreen)
    const routeNameRef = useRef()

    // initial state of the navigator; this does NOT mean that the navigator
    // will dynamically change state as redux state changes. This takes care
    // of the state on initial mount only
    let initialState

    if (showLoadingScreen) {
        initialState = NavigationManager.predefinedStates.loadingState
    } else if (token) {
        initialState = NavigationManager.predefinedStates.bottomTabsState
    } else {
        initialState = NavigationManager.predefinedStates.authState
    }

    useEffect(() => {
        if (showLoadingScreen) {
            NavigationManager.resetRoot(NavigationManager.predefinedStates.loadingState)
        } else if (token) {
            NavigationManager.resetRoot(NavigationManager.predefinedStates.bottomTabsState)
        } else {
            NavigationManager.resetRoot(NavigationManager.predefinedStates.authState)
        }
    }, [token, showLoadingScreen])

    async function logScreen (navigationState) {
        const currentRoute = navigationRef.current.getCurrentRoute()
        const previousRouteName = routeNameRef.current
        const currentRouteName = currentRoute.name
        // const currentRouteParams = currentRoute.params

        if (previousRouteName !== currentRouteName) {
            console.log(`navigated to ${currentRouteName}`)
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName
    }

    const RootStackNav = createStackNavigator()
    return (
        <NavigationContainer
            ref={navigationRef}
            initialState={initialState}
            onReady={() =>
                (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
            }
            onStateChange={logScreen}
        >
            <RootStackNav.Navigator
                mode="modal"
                initialRouteName="AuthStack"
            >
                <RootStackNav.Screen
                    name="AuthStack"
                    component={AuthStack}
                    options={{
                        headerShown: false,
                        animationEnabled: false,
                    }}
                />

                <RootStackNav.Screen
                    name="LoadingView"
                    component={LoadingView}
                    options={{
                        headerShown: false,
                        animationEnabled: false,
                    }}
                />

                <RootStackNav.Screen
                    name="BottomTabs"
                    component={BottomTabs}
                    options={{
                        headerShown: false,
                        animationEnabled: false,
                    }}
                />
            </RootStackNav.Navigator>
        </NavigationContainer>
    )
}
