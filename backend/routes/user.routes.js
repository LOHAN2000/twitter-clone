import express from 'express'
import { UserController } from '../controllers/user.controller.js'
import { protectRoute } from '../middleware/protectRoute.js'

const router = express.Router()

router.get('/profile/:username', protectRoute, UserController.getProfile)
router.get('/suggested', protectRoute, UserController.getSuggestedUsers)
router.get('/search', protectRoute, UserController.search)
router.post('/follow/:id', protectRoute, UserController.followUnfollowUser)
router.post('/update', protectRoute, UserController.updateProfile)

export default router