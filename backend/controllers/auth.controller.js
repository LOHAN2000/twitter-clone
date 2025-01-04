import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export class AuthController {
  
  static async signup (req, res) {
    try {
      const {fullname, username, email, password} = req.body

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
        res.status(400).json({'Error': 'Invalid user data'})
      }


    } catch (error) {
      console.log('Error function signup')
    }
  }

  static async login (req, res) {
    res.json({data: 'You hit the login endpoint'});
  }
  
  static async logout (req, res) {
    res.json({data: 'You hit the logout endpoint'});
  }
}