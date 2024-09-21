import { Router } from "express";
import { addComment, allPosts, createPost, deleteImage, deletePost, getAllComments, getPost, likePost, searchPost, updatePost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = Router();

router.route('/createpost').post(verifyJWT, upload.single('file'), createPost)
router.route('/updatepost').post(verifyJWT, updatePost)
router.route('/search').get(verifyJWT, searchPost)
router.route('/deleteimage/:id').get(verifyJWT, deleteImage)
router.route('/all-posts').get(allPosts)
router.route('/:id').get(getPost)
router.route('/:id/delete-post').delete(verifyJWT, deletePost)

router.route('/like').post(verifyJWT, likePost)

router.route('/add-comment').post(verifyJWT, addComment)
router.route('/:id/all-comments').get(verifyJWT, getAllComments)

export default router