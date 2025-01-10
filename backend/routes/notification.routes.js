import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { NotificationController } from '../controllers/notification.controller.js';

const router = express.Router()

router.get('/', protectRoute, NotificationController.getNotifications)
router.delete('/', protectRoute, NotificationController.deleteNotifications)
router.delete('/:id', protectRoute, NotificationController.deleteNotification)

export default router;