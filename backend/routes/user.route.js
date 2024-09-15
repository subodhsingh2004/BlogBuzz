import { Router } from "express";
import { loginUser, getCurrentUser, registerUser, getLikedPosts, getMyPosts, logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = Router();

// register
router.route('/signup').post(registerUser)
// login
router.route('/login').post(loginUser)
// logout
router.route('/logout').get(logoutUser)
// get user details
router.route('/get-current-user').get(verifyJWT, getCurrentUser)
// get user posts
router.route('/get-my-posts').get(verifyJWT, getMyPosts)

// get liked posts
router.route('/get-liked-posts').get(verifyJWT, getLikedPosts)

export default router