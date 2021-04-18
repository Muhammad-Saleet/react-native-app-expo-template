import React, { ReactElement } from "react"
import { useDispatch } from "react-redux"
import { StyleSheet, View } from "react-native"
import { Button } from "react-native-elements"
import { setToken } from "../../redux/slices/authSlice"

export function LoginView ():ReactElement {
    const dispatch = useDispatch()
    const handleLogin = () => {
        dispatch(setToken({ token: "fakeToken" }))
    }

    return (
        <View style={styles.container}>
            <Button
                title={"login"}
                onPress={handleLogin}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})

