import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slices/AuthSlice.js";
import PostsSlice from "../slices/PostsSlice.js";

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        posts: PostsSlice
    }
})

export default store;