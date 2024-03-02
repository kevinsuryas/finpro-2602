import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (initialState, action) => {
            console.log(action.payload)
            initialState.user = {
                username: action.payload.token,
            }
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer    