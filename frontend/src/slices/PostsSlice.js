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
            state.postsData = action.payload
            sessionStorage.setItem("Post", JSON.stringify(action.payload))
        },
        addPosts: (state, action) => {
            state.postsData.unshift = action.payload
            sessionStorage.setItem("Post", JSON.stringify(state.postsData))

        }
    }
})

export const { setPosts, addPosts } = postSlice.actions
export default postSlice.reducer