import axiosInstance from "./AxiosInstance"
import { AxiosRequestConfig } from "axios"

interface ApiResponse {
    data?;
    error?: {
        value: string;
        message: string;
    };
}

const listPosts = async (
    userId?: string,
) : Promise<ApiResponse> => {
    const config: AxiosRequestConfig = {
        method: "get",
        url: "/posts",
        params: { userId },
    }

    try {
        return await axiosInstance(config)
    } catch (e) {
        return {
            error: {
                value: "RequestFailed",
                message: `listing posts: request failed with status ${e?.response?.status}: ${e?.response?.data?.detail}`,
            },
        }
    }
}

const getPost = async (
    id: string
) : Promise<ApiResponse> => {
    const config: AxiosRequestConfig = {
        method: "get",
        url: `/posts/${id}`,
    }

    try {
        return await axiosInstance(config)
    } catch (e) {
        return {
            error: {
                value: "RequestFailed",
                message: `getting post: request failed with status ${e?.response?.status}: ${e?.response?.data?.detail}`,
            },
        }
    }
}

export const Api = {
    listPosts,
    getPost,
}
