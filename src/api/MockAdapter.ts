import MockedResponses from "./mocked-responses"
import AxiosMockAdapter from "axios-mock-adapter"
import { AxiosInstance } from "axios"

const mockedRequests = {
    listPosts: false,
    getPost: false,
}

const add = (
    axiosInstance: AxiosInstance,
    options: {
        delayResponse?: number;
        onNoMatch?: "passthrough" | "throwException";
    },
) : void => {
    // mocking requests during development
    const mock = new AxiosMockAdapter(axiosInstance, options)

    // this can be used if we dont care about query params
    // mockedRequests.listPosts && mock
    //     .onGet("/posts") // eg: /posts/1
    //     .reply(200, MockedResponses.listPosts)

    mockedRequests.listPosts &&
    mock.onGet("/posts").reply(function (config) {
        // `config` is the axios config containing url, params, etc..

        if (config?.params?.userId) {
            // return an array in the form of [status, data, headers]
            return [
                200,
                MockedResponses.listPostsFiltered,
            ]
        }
        else {
            return [
                200,
                MockedResponses.listPosts,
            ]
        }
    })

    // use regex to handle url params
    mockedRequests.getPost && mock
        .onGet(/\/posts\/\d+/) // eg: /posts/1
        .reply(200, MockedResponses.getPost)

}

export const MockAdapter = { add }
