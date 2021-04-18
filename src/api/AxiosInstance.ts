import axios from "axios"
import { MockAdapter } from "./MockAdapter"
import { store } from "../redux/store"

const baseURL = "https://jsonplaceholder.typicode.com"

const axiosInstance = axios.create({ baseURL })

// axiosInstance will have a MockAdapter which will intercept calls according to a preset
// configuration. see the MockAdapter code for more details
MockAdapter.add(axiosInstance, { onNoMatch: "passthrough" })

// log every request made
axiosInstance.interceptors.request.use((req) => {
    console.log(`${req.method}:${req.url}`)
    return req
})

// add auth token to protected routes
axiosInstance.interceptors.request.use((req) => {
    if (req?.params?._protected) {
        delete req.params._protected // internal param; don't send to api
        const token = store.getState().auth.token
        req.headers.Authorization = `Token ${token}`
    }
    return req
})

// add error handling for generic errors
axiosInstance.interceptors.response.use(
    (res) => {
        return res
    },
    (err) => {
        const requestUrl = `${err?.config?.method || ""}:${err?.config?.url || ""}`

        // request cancelled
        if (axios.isCancel(err)) {
            console.log(`RequestCancelled: ${err.message}`)
            throw { value: "RequestCancelled", message: "the request was cancelled using a cancel token" }

            // request was made and got an error (status code not in 2xx range)
            // we will let the caller catch and handle these as there could be different causes
            // (status 400, 401, 500, etc..) and should be handled differently per endpoint
        } if (err.response) {
            const status = err?.response?.status || ""
            console.log(`${requestUrl} => RequestFailed: status ${status}`)
            throw err

            // request was made but no response was received
        } else if (err.request) {
            const status = err?.request?.status || ""
            console.log(`${requestUrl} => NoResponseReceived: status ${status}`)
            throw { value: "NoResponseReceived", message: "no response received" }

            // failed to make a request to the server
        } else {
            console.log("NoRequestMade: could not make request to server")
            throw { value: "NoRequestMade", message: "could not make request to server" }
        }
    },
)

export default axiosInstance
