import { createSlice } from "@reduxjs/toolkit";

const getPostsFromSessionStorage = () => {
    const allPosts = sessionStorage.getItem("Post")
    return allPosts ? JSON.parse(allPosts) : []
}

const initialState = {
    postsData: [...getPostsFromSessionStorage()]
}

const postSlice = createSlice({
    name: "posts",

    initialState,

    reducers: {
        setPosts: (state, action) => {
            state.postsData = action.payload
            sessionStorage.setItem("Post", JSON.stringify(action.payload))
        },
        updatePost: (state, action) => {
            const oldPost = state.postsData.find(p => p._id === action.payload.post._id)
            
            sessionStorage.setItem("Post", JSON.stringify(state.postsData))
        },
        addPosts: (state, action) => {
            state.postsData.unshift(action.payload.post)
            sessionStorage.setItem("Post", JSON.stringify(state.postsData))
        },
        deletePost: (state, action) => {
            state.postsData = state.postsData.filter(p => p._id != action.payload)
            sessionStorage.setItem("Post", JSON.stringify(state.postsData))
        }
    }
})

export const { setPosts, addPosts, deletePost, updatePost } = postSlice.actions
export default postSlice.reducer