import bcrypt from 'bcryptjs'
import { v2 as cloudinary } from 'cloudinary'
import Notification from "../models/notification.model.js"
import User from "../models/user.model.js"
import Post from '../models/post.model.js'

export class UserController {
  static async getProfile (req, res) {
    try {
      const { username } = req.params
  
      if (!username) {
        return res.status(400).json({message: 'Invalid username'})
      }
  
      const user = await User.findOne({username}).select('-password').populate({path: 'following', select: '-password'}).populate({path: 'followers', select: '-password'})
  
      if (!user) {
        return res.status(404).json({message: "User not found"})
      }

      const postCount = await Post.countDocuments({ user: user._id });

      res.status(200).json({User: user, postCount})

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
        const updatedData = await User.findByIdAndUpdate(currentUser._id, {$pull: {following: id}}, {new: true}).populate({path: 'following', select: '-password'})
        res.status(200).json({message: 'User unfollow successfully', updatedData})

      } else {
        await User.findByIdAndUpdate(id, {$push: {followers: currentUser._id}})
        const updatedData = await User.findByIdAndUpdate(currentUser._id, {$push: {following: id}}, {new: true}).populate({path: 'following', select: '-password'})
        
        const newNotification = new Notification({
          type: 'follow',
          from: currentUser._id,
          to: userToModify._id
        })
        
        await newNotification.save()

        res.status(200).json({message: 'User follow successfullly', updatedData})
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
      const followingIds = usersFollowedByMe?.following || []

      const users = await User.aggregate([
        {
          $match:{
            _id:{$ne: userId}
          }
        },
        { $sample: { size: 10}}
      ])

      
      const filteredUsers = users.filter((user) => !followingIds.some((id) => id.toString() === user._id.toString()))
      const suggestedUsers = filteredUsers.splice(0, 4)

      suggestedUsers.forEach(user => user.password=null)

      res.status(200).json({data:suggestedUsers})

    } catch (error) {
      console.log('Error in function getSuggestedUsers:', error.message)  
      res.status(500).json({Error: 'Internal server error.'})
    }
  }

  static async updateProfile (req, res) {
    let { profileImg, coverImg } = req.body
    const { fullname, username, email, bio, link, currentPassword, newPassword } = req.body

    const userId = req.user._id

    try {
      const user = await User.findById(userId)

      const isUsernameChanged = username && username !== user.username
      const isFullnameChanged = fullname && fullname !== user.fullname  

      if (isUsernameChanged || isFullnameChanged) {
        if (!currentPassword || !newPassword) {
          return res.status(400).json({message: 'Both current password and new password are required to update username or fullname'})
        }
      }

      if (currentPassword && newPassword) {
        const isMatch = await bcrypt.compare(currentPassword, user.password)

        if (!isMatch) {
          return res.status(400).json({message: 'Current password is incorrect'})
        }

        if (newPassword < 6) {
          return res.status(400).json({message: 'Password must be at least 6 characters long'})
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(newPassword, salt)
      }

      if (username && username.length > 10) {
        return res.status(400).json({ message: 'Username must be less than 10 characters' });
      }
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken' });
      }
  
      if (fullname && fullname.length > 30) {
        return res.status(400).json({ message: 'Full name must be less than 40 characters' });
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
  
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: 'Email is already taken' });
      }
  
      if (bio && bio.length > 200) {
        return res.status(400).json({ message: 'Bio must be less than 200 characters' });
      }
  
      if (link && link.length > 30) {
        return res.status(400).json({ message: 'Link must be less than 20 characters' });
      }
  
      // Actualizar imágenes, si están presentes
      if (profileImg) {
        if (user.profileImg) {
          await cloudinary.uploader.destroy(user.profileImg.split('/').pop().split('.')[0]);
        }
        const uploadedResponse = await cloudinary.uploader.upload(profileImg);
        profileImg = uploadedResponse.secure_url;
      }
  
      if (coverImg) {
        if (user.coverImg) {
          await cloudinary.uploader.destroy(user.coverImg.split('/').pop().split('.')[0]);
        }
        const uploadedResponse = await cloudinary.uploader.upload(coverImg);
        coverImg = uploadedResponse.secure_url;
      }
  
      // Actualizar otros campos
      user.fullname = fullname || user.fullname;
      user.username = username || user.username;
      user.email = email || user.email;
      user.bio = bio || user.bio;
      user.link = link || user.link;
      user.profileImg = profileImg || user.profileImg;
      user.coverImg = coverImg || user.coverImg;
  
      await user.save();
      user.password = null;
      res.status(200).json({ message: 'Profile updated successfully', data: user });


    } catch (error) {
      console.log(error)
      res.status(500).json({Error: 'Internal server error'})
    }
  }

  static async search (req, res) {
    try {
      const { q } = req.query

      if (!q) {
        return res.status(400).json({message: 'The query is required'})
      }

      const regex = new RegExp(q, 'i')

      const users = await User.find({
        $or: [
          { username: regex },
          { fullname: regex}
        ]
      }).select('-password')

      res.status(200).json({message: 'Search successfully', users})

    } catch (error) {
      console.log(error)
      res.status(500).json({Error: 'Internal server error'})
    }
  }
}