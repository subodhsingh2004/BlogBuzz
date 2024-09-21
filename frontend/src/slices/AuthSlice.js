import { createSlice } from "@reduxjs/toolkit";

const getUserFromSessionStorage = () => {
    return sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : []
}

const initialState = {
    status: false,
    userData: getUserFromSessionStorage()
}

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            sessionStorage.setItem("user", JSON.stringify(action.payload))
        },
        logout: (state, _) => {
            state.status = false;
            state.userData = null;
            sessionStorage.clear("user")
        },
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;