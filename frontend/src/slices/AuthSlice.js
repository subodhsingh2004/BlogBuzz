import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")) : null
}

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            sessionStorage.setItem("userData", JSON.stringify(action.payload))
        },
        logout: (state, _) => {
            state.status = false;
            state.userData = null;
            sessionStorage.clear("userData")
            sessionStorage.clear("Posts")
        },
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;