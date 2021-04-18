import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'
import { HomeStack } from './HomeStack'

export function BottomTabs () {
    const MainTabsNav = createBottomTabNavigator()

    return (
        <MainTabsNav.Navigator
            initialRouteName="HomeStack"
        >
            <MainTabsNav.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused, color, size }) => (
                        <MaterialIcons
                            name="person"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </MainTabsNav.Navigator>
    )
}
