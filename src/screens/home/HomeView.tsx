import React, { useEffect, ReactElement, useState } from "react"
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Api } from "../../api/Api"
import { useInfiniteQuery } from "react-query"
import { Post } from "../../types"

export function HomeView ():ReactElement {
    const limit = 10
    const [posts, setPosts] = useState<Array<Post>>([])

    const {
        fetchNextPage,
        isFetchingNextPage,
        data,
    } = useInfiniteQuery(
        {
            queryKey: ["posts", { userId: undefined, limit }],
            queryFn: Api.listPosts,
            getNextPageParam,
        })

    function getNextPageParam (lastPage) {
        if (lastPage.data.length < limit) {
            return undefined // to indicate that no more pages exists
        }
        return lastPage.pageParam + 1
    }

    // squash the array of posts of every page into one array with all the posts
    useEffect(() => {
        if (data?.pages) {
            const allPosts = data.pages.reduce((accumulator, currentPage) => accumulator.concat(currentPage.data), [])
            setPosts(allPosts)
        }
    }, [data])

    function renderPostCard ({ item }: {item: Post}) {
        return (
            <View style={styles.cardContainer}>
                <TouchableOpacity
                    onPress={() => null}
                    style={{ flex: 1 }}
                >
                    <Text>
                        {item.id}
                    </Text>
                    <Text numberOfLines={1}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderListFooter () {
        if (isFetchingNextPage) {
            return (
                <ActivityIndicator size="large" color={"blue"}/>
            )
        }
        return (<View style={{ height: 40 }}/>)
    }

    function renderEmpty () {
        return (
            <ActivityIndicator size="large" color={"blue"}/>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={renderPostCard}
                onEndReached={() => fetchNextPage()}
                keyExtractor={(post) => post.id.toString()}
                ListEmptyComponent={renderEmpty()}
                ListFooterComponent={renderListFooter()}
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
    cardContainer: {
        marginVertical: 5,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
})

