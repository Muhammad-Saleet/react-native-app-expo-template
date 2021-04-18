import React from "react"
import { useDispatch } from "react-redux"
import { StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-elements"
import { removeToken } from "../../redux/slices/authSlice"

export function HomeView ({ navigation }) {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(removeToken())
    }

    return (
        <View style={styles.container}>
            <Text>
                Home Tab
            </Text>
            <Button
                title={"logout"}
                onPress={handleLogout}
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
