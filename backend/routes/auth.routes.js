import express from 'express'
import { AuthController } from '../controllers/auth.controller.js';

const router = express.Router()

router.get('/signup', AuthController.signup);

router.get('/login', AuthController.login);

router.get('/logout', AuthController.logout);

export default router
