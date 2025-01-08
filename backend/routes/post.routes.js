import express from 'express'
import { protectRoute } from '../middleware/protectRoute';

const router = express.Router()

router.post('/create', protectRoute, )

export default router;