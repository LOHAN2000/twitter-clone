import Notification from "../models/notification.model.js"
import User from "../models/user.model.js"

export class UserController {
  static async getProfile (req, res){
    try {
      const { username } = req.params
  
      if (!username) {
        return res.status(400).json({message: 'Invalid username'})
      }
  
      const user = await User.findOne({username}).select('-password')
  
      if (!user) {
        return res.status(404).json({message: "User not found"})
      }

      res.status(200).json({User: user})

    } catch (error) {
      console.log('Error in function getProfile', error)      
      return res.status(500).json({Error: 'Internal server error.'})
    }
  }

  static async followUnfollowUser (req, res) {
    try {

      const { id } = req.params

      const userToModify = await User.findById(id)
      const currentUser = await User.findById(req.user._id)
    
      if (id === currentUser._id.toString()) {
        return res.status(400).json({message: 'You cant follow/unfollow yourself'})
      }

      if(!userToModify || !currentUser) {
        return res.status(404).json({message: 'User not found'})
      }

      const isFollowing = currentUser.following.includes(id)

      if (isFollowing) {
        await User.findByIdAndUpdate(id, {$pull: {followers: currentUser._id}})
        await User.findByIdAndUpdate(currentUser._id, {$pull: {following: id}})
        res.status(200).json({message: 'User unfollow successfully'})

      } else {
        await User.findByIdAndUpdate(id, {$push: {followers: currentUser._id}})
        await User.findByIdAndUpdate(currentUser._id, {$push: {following: id}})
        
        const newNotification = new Notification({
          type: 'follow',
          from: currentUser._id,
          to: userToModify._id
        })
        await newNotification.save()

        res.status(200).json({message: 'User follow successfullly'})
      }
    } catch (error) {
      console.log('Error in function followUnfollower', error.message) 
      res.status(500).json({Error: 'Internal server error.'})
    }
  }

  static async getSuggestedUsers (req, res) {
    try {
      const userId = req.user._id
      const usersFollowedByMe = await User.findById(userId).select('following')

      const users = await User.aggregate([
        {
          $match:{
            _id:{$ne: userId}
          }
        },
        { $sample: { size: 10}}
      ])

    } catch (error) {
      console.log('Error in function getSuggestedUsers:', error.message)  
      res.status(500).json({Error: 'Internal server error.'})
    }
  }
}