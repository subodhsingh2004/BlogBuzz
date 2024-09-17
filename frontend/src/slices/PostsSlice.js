import { createSlice } from "@reduxjs/toolkit";

const getPostsFromSessionStorage = () => {
    const allPosts = sessionStorage.getItem("Post")
    return allPosts ? JSON.parse(allPosts) : []
}

const initialState = {
    postsData: getPostsFromSessionStorage()
}

const postSlice = createSlice({
    name: "posts",

    initialState,

    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
            sessionStorage.setItem("Post", JSON.stringify(action.payload))
        }
    }
})

export const { setPosts } = postSlice.actions
export default postSlice.reducer