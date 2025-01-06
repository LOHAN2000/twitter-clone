import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export class AuthController {
  
  static async signup (req, res) {
    try {
      const {fullname, username, email, password} = req.body

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      console.log(email)

      if (!emailRegex.test(email)) {
        return res.status(400).json({message: 'Invalid email format'})
      }

      const existingUser = await User.findOne({ username })

      if (existingUser) {
        return res.status(400).json({message: 'Username is already taken'})
      }

      const existingEmail = await User.findOne({ email })

      if (existingEmail) {
        return res.status(400).json({message: 'Email is already taken'})
      }

      if (password.length < 6) {
        return res.status(400).json({message: 'Password must be at least 6 characters long'})
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newUser = new User({
          fullname: fullname,
          username: username,
          email: email,
          password: hashedPassword
      })

      if (newUser) {
        generateTokenAndSetCookie(newUser._id, res)
        await newUser.save()

        res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullname,
          username: newUser.username,
          email: newUser.email,
          followers: newUser.followers,
          following: newUser.following,
          profileImg: newUser.profileImg,
          coverImg: newUser.coverImg
        })
      } else {
        return res.status(400).json({Error: 'Invalid user data'})
      }


    } catch (error) {
      console.log('Error in function signup', error)
      res.status(500).json({Error: 'Internal server error'}) 
    }
  }

  static async login (req, res) {
    try {
      const {username, password} = req.body 

      const user = await User.findOne({username})
      const isPasswordCorrect = await bcrypt.compare(password, user?.password || '')

      if (!user || !isPasswordCorrect) {
        return res.status(400).json({message: 'Invalid username or password'})
      }

      generateTokenAndSetCookie(user._id, res)

      res.status(200).json({
        _id: user._id,
        fullName: user.fullname,
        username: user.username,
        email: user.email,
        followers: user.followers,
        following: user.following,
        profileImg: user.profileImg,
        coverImg: user.coverImg
      })

    } catch (error) {
      console.log('Error in function login', error)
      return res.status(500).json({Error: 'Internal server error'}) 
    }
  }
  
  static async logout (req, res) {
    try {
      res.cookie('jwt', '', {maxAge: 0})
      res.status(200).json({message: 'Logged out successfully'})
    } catch (error) {
      console.log('Error in functino logout')
      res.status(500).json({Error: 'Internal server error'})
    }
  }

  static async getMe (req, res) {
    try {
      const user = await User.findById(req.user._id).select('-password')
      res.status(200).json({User: user})
    } catch (error) {
      console.log({Error: 'Error in function getMe'})
      res.status(500).json({Error: 'Internal server error'})
    }
  }
}