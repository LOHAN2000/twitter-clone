import express from 'express'
import { AuthController } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router()

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/getMe', protectRoute, AuthController.getMe)

export default router
