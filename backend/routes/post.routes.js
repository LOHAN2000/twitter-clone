import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { PostController } from '../controllers/post.controller.js';

const router = express.Router()

router.get('/all', protectRoute, PostController.getPosts);
router.get('/likes/:id', protectRoute, PostController.getLikedPosts);
router.get('/following/:id', protectRoute, PostController.getFollowingPosts)
router.get('/user/:username', protectRoute, PostController.getPostsbyUser)
router.post('/create', protectRoute, PostController.createPost);
router.post('/comment/:id', protectRoute, PostController.commentPost);
router.post('/like/:id', protectRoute, PostController.likeUnlikePost);
router.delete('/:id', protectRoute, PostController.deletePost);
router.delete('/comment/:id', protectRoute, PostController.deleteComment)

export default router;