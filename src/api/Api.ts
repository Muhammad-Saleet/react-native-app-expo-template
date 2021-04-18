import axiosInstance from "./AxiosInstance"
import { AxiosRequestConfig } from "axios"
import { Post } from "../types"

type ListPostsType = (
    args: {
        queryKey: string | any[],
        pageParam: number,
    }
) =>
    Promise<{
        data: Array<Post>,
        pageParam: number,
    }>

const listPosts: ListPostsType = async ({
    queryKey,
    pageParam = 1,
}) => {
    const [key, { userId, limit }] = queryKey

    const config: AxiosRequestConfig = {
        method: "get",
        url: "/posts",
        params: {
            _page: pageParam,
            _limit: limit,
            userId,
        },
    }

    const response = await axiosInstance(config)
    return { data: response.data, pageParam }
}

// const getPost = async (
//     id: string
// ) : Promise<ApiResponse> => {
//     const config: AxiosRequestConfig = {
//         method: "get",
//         url: `/posts/${id}`,
//     }
//
//     try {
//         return await axiosInstance(config)
//     } catch (e) {
//         return {
//             error: {
//                 value: "RequestFailed",
//                 message: `getting post: request failed with status ${e?.response?.status}: ${e?.response?.data?.detail}`,
//             },
//         }
//     }
// }

export const Api = {
    listPosts,
    // getPost,
}
