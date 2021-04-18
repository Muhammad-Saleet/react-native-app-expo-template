import React, { useEffect, ReactElement } from "react"
import { useDispatch } from "react-redux"
import { StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-elements"
import { removeToken } from "../../redux/slices/authSlice"
import { Api } from "../../api/Api"

export function HomeView ():ReactElement {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(removeToken())
    }

    useEffect(() => {
        const listPost = async () => {
            const { data } = await Api.listPosts()
            console.log("post list --- ", JSON.stringify(data.slice(0, 5), null, 2))

        }

        const listPostFiltered = async () => {
            const { data } = await Api.listPosts("4")
            console.log("post list filtered --- ", JSON.stringify(data.slice(0, 5), null, 2))

        }

        const getPost = async () => {
            const { data } = await Api.getPost("1")
            console.log("post --- ", JSON.stringify(data, null, 2))
        }
        listPost()
        getPost()
        listPostFiltered()
    }, [])

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
