import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteCloudinary, uploadOnCloudinary } from "../utils/FileUpload.js";

// function to createPost
const createPost = asyncHandler(async function (req, res) {
    const { title, content, author } = req.body
    const postImage = req.file

    if (!postImage) throw new ApiError(400, "image is required")

    // check if any of the fields are empty
    if ([title, content, author].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    // find user 
    const authorOfPost = await User.findById(author)
    if (!authorOfPost) throw new ApiError(401, "Unauthorized Request")

    // upload image
    const img = await uploadOnCloudinary(req.file.path)
    console.log(img)
    if (!img) throw new ApiError(400, "error in uploading image")

    console.log("img url", img.url)

    // create a post
    const createdPost = await Post.create({
        title,
        content,
        author,
        postImage: img.url
    })

    // if post is not created successfully
    if (!createdPost) throw new ApiError(500, "Error in creating Post")

    // add the id of post in the array of posts in user
    authorOfPost.posts.push(createdPost._id)
    await authorOfPost.save({ validateBeforeSave: false })

    return res.status(201).json({ message: "Post created successfully :)" })
})

// function to updatePost
const updatePost = asyncHandler(async function (req, res) {
    const { title, content, postId } = req.body


    if ([title, content, postId].some(field => field?.trim() === "")) throw new ApiError(401, "all fields are required")

    // find Post
    const post = await Post.findById(postId)
    if (!post) throw new ApiError(404, "cannot find Post")

    const newTitle = title || post.title
    const newContent = content || post.content

    const updatedPost = await Post.updateOne(
        { _id: postId },
        {
            $set: {
                title: newTitle,
                content: newContent
            }
        }
    )
    // console.log(updatedPost);


    res.status(200).json(updatedPost)

})

// function to search Post
const searchPost = asyncHandler(async function (req, res) {
    const name = req.query.q

    const post = await Post.find({
        title: { $regex: name, $options: 'i' }
    }).populate({ path: "author", select: "-_id username" })

    if (!post) res.status(404).json({ message: "Post Not Found" })

    res.status(200).json(post)
})

const deleteImage = asyncHandler(async function (req, res) {
    const { id } = req.params
    // console.log(id);
    

    const result = await deleteCloudinary(id)
    // console.log("result", result);


    res.send("done")
})

// function to see all the posts
const allPosts = asyncHandler(async function (req, res) {
    const posts = await Post.find().populate({ path: "author", select: "username -_id" })
    return res.json(posts)
})

// function to get a particular post
const getPost = asyncHandler(async function (req, res) {
    const { id } = req.params

    const post = await Post.findById(id).populate({ path: "author", select: "username -_id" }).populate({ path: "comments.user", select: "username -_id" })

    if (!post) throw new ApiError(404, "Post Not Found")

    res.status(200).json(post)

})

// function to like a post
const likePost = asyncHandler(async function (req, res) {
    const { userId, postId, like } = req.body

    // find user
    const user = await User.findById(userId)
    if (!user) throw new ApiError(400, "unauthorized requests")

    // find post
    const post = await Post.findById(postId)
    if (!post) throw new ApiError(404, "Post Not Found")

    if (like) {
        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
            user.likedPosts.push(postId)
        }
    } else {
        post.likes = post.likes.filter(id => id.toString() !== userId)
        user.likedPosts = user.likedPosts.filter(id => id.toString() !== postId)
        // console.log(post.likes);
    }
    await post.save({ validateBeforeSave: false })

    user.save({ validateBeforeSave: true });

    return res.status(200).json(post.likes)

})

// function to delete a post
const deletePost = asyncHandler(async function (req, res) {
    const { id } = req.params
    const { _id } = req.user

    const post = await Post.findByIdAndDelete(id)

    const user = await User.findById(_id)
    user.posts = user.posts.filter(pId => pId != id)
    user.save({ validateBeforeSave: false })

    return res.status(200).json({ message: "Deletetd Successfully", data: post })
})

// function to add comment
const addComment = asyncHandler(async function (req, res) {
    const { commentText, userId, postId } = req.body

    if ([commentText, userId, postId].some(fields => fields === "")) throw new ApiError(403, "All fields are required")

    // find post 
    const post = await Post.findById(postId)
    if (!post) throw new ApiError(404, "something went wrong");


    const newComment = {
        user: userId,
        text: commentText
    }

    post.comments.unshift(newComment)
    const allcomments = await post.save({ validateBeforeSave: false })

    return res.status(200).json({ message: "comment added successfully", comments: newComment })

})

// function to get all comments
const getAllComments = asyncHandler(async function (req, res) {
    const { id } = req.params

    const allcomments = await Post.findById(id).select("comments -_id").populate({ path: "comments.user", select: "username -_id" })
    if (!allcomments) throw new ApiError(404, "Not Found")

    res.status(200).json(allcomments)
})

export { createPost, updatePost, allPosts, getPost, likePost, addComment, getAllComments, deletePost, deleteImage, searchPost }