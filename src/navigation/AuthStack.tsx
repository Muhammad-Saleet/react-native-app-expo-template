import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginView } from '../screens/login/LoginView'

export function AuthStack () {
    const AuthStackNav = createStackNavigator()

    return (
        <AuthStackNav.Navigator
            initialRouteName="LoginView"
        >
            <AuthStackNav.Screen
                name="LoginView"
                component={LoginView}
                options={{ headerTitle: 'Login Screen', headerShown: true }}
            />
        </AuthStackNav.Navigator>
    )
}
