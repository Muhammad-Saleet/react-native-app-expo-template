import { createSlice } from '@reduxjs/toolkit'

const initialState = { token: '' }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken (state, action) {
            state.token = action.payload.token
        },
        removeToken (state) {
            state.token = ''
        },
    },
})

export const { setToken, removeToken } = authSlice.actions
export default authSlice.reducer
