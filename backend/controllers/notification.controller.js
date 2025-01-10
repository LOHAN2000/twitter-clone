import Notification from '../models/notification.model.js'
export class NotificationController {
  static async getNotifications (req, res) {
    try {
      const userId = req.user._id

      const nofications = await Notification.find({to: userId}).populate({
        path: 'from',
        select: 'username profileImg'
      })

      await Notification.updateMany({to: userId}, {read: true});

      res.status(200).json({nofications})
    } catch (error) {
      console.log('Error in getNotifications function')
    }
  }

  static async deleteNotifications (req, res) {
    try {
      const userId = req.user._id

      await Notification.deleteMany({to: userId})

      res.status(200).json({message: 'Notifications delated successfully'})
    } catch (error) {
      console.log('Error in deleteNotifications function')
      res.status(500).json({Error: 'Internal server error'})
    }
  }

  static async deleteNotification (req, res) {
    try {
      const notificationId = req.params.id
      const userId = req.user._id

      if (!notificationId) {
        return res.status(400).json({message: 'Notification id field is required'})
      }

      const notification = await Notification.find({to: userId})

      if (!notification) {
        return res.status(404).json({message: 'Notification was not found'})
      }

      if (notification.to.toString() !== userId.toString()) {
        return res.status(200).json({message: 'You are not authorizaded to deleted this post'})
      }
      
      await Notification.findByIdAndDelete(notificationId)

      res.status(200).json({message: 'Post deleted successfully'})
    } catch (error) {
      console.log('Error in deleteNotification function', error)
      res.status(500).json({Error: 'Internal server error'})
    }
  }
}