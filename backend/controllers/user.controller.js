import { populate } from "dotenv";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// function to generate Access and Refresh token
const generateAccessAndRefreshToken = async (userId) => {
    try {
        // find user
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
        
        // save refresh token in database
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new Error("something went wrong while generating access and refresh token")
    }
}

// Register a User
const registerUser = asyncHandler(async function (req, res) {
    const { username, email, password } = req.body;

    // check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) throw new ApiError(401, "User already exists")

    // creating a user 
    const user = await User.create({ username, email, password })

    if (!user) throw new ApiError(500, "Something went wrong while registering the user")

    const userData = await User.findById(user._id).select("-password -refreshToken")

    // send the response
    return res.status(201).json({ userData })
})

// Login a User
const loginUser = asyncHandler(async function (req, res) {
    const {email, password} = req.body


    // check if any fields are empty
    if([email, password].some(field => field?.trim() === "")) throw new ApiError(400, "All fields are required")
    
    // find user
    const user = await User.findOne({email: email})

    if(!user) throw new ApiError(401, "User does not exists")

    // check password
    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid) throw new ApiError(401, "either email or password is incorrect")

    const token = await generateAccessAndRefreshToken(user._id)
    
    // userdetails to send as response
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    
    res.status(200)
    .cookie("token", token.accessToken)
    .json(loggedInUser)

})

// Logout a User
const logoutUser = asyncHandler(async function (req, res) {
    res.clearCookie("token")
    res.status(200).send({message: "Logged out successfully"})
})

// Get user Details
const getCurrentUser = asyncHandler(async function (req, res) {

    // console.log(req.user)
    const user = req.user

    const userinfo = await User.findById(user._id).select("-password -refreshToken").populate("posts likedPosts savedPosts")

    if(!user) throw new ApiError(401, "unautorized")
    
    return res.status(200).json(userinfo)
})

// Get user Posts
const getMyPosts = asyncHandler(async function (req, res) {
    const {_id} = req.user

    const user = await User.findById(_id).populate({path: "posts",populate:{path: "author", select: "username"}})

    res.status(200).send(user)
})

// User's Liked Posts
const getLikedPosts = asyncHandler(async function(req, res) {
    const {_id} = req.user
    if(!_id) throw new ApiError(401, "unauthorized request")

    // find user 
    const user = await User.findById(_id).populate({path: "likedPosts", populate:{path: "author", select: "username"}}).select("likedPosts")
    // console.log(user);
    
    if(!user) throw new ApiError(404, "something went wrong")

    res.status(200).send(user)
})
export { registerUser, loginUser, logoutUser, getCurrentUser, getLikedPosts, getMyPosts };