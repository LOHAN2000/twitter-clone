import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.model.js";
import Post from '../models/post.model.js'
import Notification from "../models/notification.model.js";
import mongoose from "mongoose";

export class PostController {
  static async createPost (req, res) {
    try {
      const { text } = req.body;
      let { img } = req.body;

      const userId = req.user._id;

      if (!text && !img) {
        return res.status(400).json({message: 'Post must have text and image'})
      }
       
      if (img) {
        const uploadedImage = await cloudinary.uploader.upload(img);
        img = uploadedImage.secure_url;
      }

      const newPost = new Post({
        user: userId,
        text,
        img
      })

      await newPost.save()

      res.status(200).json({message: 'Post Add', post: newPost})
      
    } catch (error) {
      console.log('Error in function createPost', error)
      res.status(500).json({Error: 'Internal server error'})
    }
  }

  static async getPosts (req, res) {
    try {
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate({
          path: 'user',
          select: '-password'
        })
        .populate({
          path: 'comments.user',
          select: '-password'
        })
        .lean(); // Convertir a objetos planos
    
      if (posts.length === 0) {
        return res.status(200).json([]);
      }
    
      // Ordenar comentarios en cada publicación
      const postsWithSortedComments = posts.map(post => {
        if (post.comments && post.comments.length > 0) {
          post.comments.sort((a, b) => {
            return new Date(b.AtAt) - new Date(a.AtAt);
          });
        }
        return post;
      });
    
      res.status(200).json(postsWithSortedComments);
    
    } catch (error) {
      console.log('Error in function getPosts', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getLikedPosts (req, res) {
    try {
      const userId = req.params.id

      if (!userId) {
        return res.status(400).json({message: 'Id user field is required'})
      }

      const user = await User.findById(userId)

      if (!user) {
        return res.status(404).json({message: 'User not found'})
      }

      const likedPosts = await Post.find({likes: userId}).sort({ updatedAt: -1 }).populate({
        path: 'user',
        select: '-password'
      }).populate({
        path: 'comments.user',
        select: '-password'
      })

      if (!likedPosts) {
        return res.status(404).json({message: 'Not liked posts found'})
      }

      res.status(200).json(likedPosts)
      
    } catch (error) {
      console.log('Error in function getLikedPosts', error)
      res.status(500).json({Error: 'Internal server error'})
    }
  }

  static async getFollowingPosts (req, res) {
    try {
      
      const userId = req.params.id

      if (!userId) {
        return res.status(400).json({message: 'Id user is required'})
      }

      const user = await User.findById(userId)

      if (!user) {
        return res.status(404).json({message: 'User not found'})
      }

      const following = user.following

      if (following === 0) {
        return res.status(200).json({message: 'No following users'})
      }

      const followingPosts = await Post.find({ user: { $in: following } })
      .sort({ createdAt: -1 })
      .populate({ path: 'user', select: '-password' })
      .populate({ path: 'comments.user', select: '-password' })

      res.status(200).json(followingPosts)

    } catch (error) {
      console.log('Error in function getFollowingPosts', error)
      res.status(500).json({Error: 'Internal server error'})
    }
  }

  static async getPostsbyUser (req, res) {
    try {

      const username = req.params.username

      if (!username) {
        return res.status(400).json({message: 'Username field is required'})
      }

      const user = await User.findOne({username: username})

      if (!user) {
        return res.status(404).json({message: 'User not found'})
      }
      const posts = await Post.find({user: user._id}).sort({createdAt: -1}).populate({
        path: 'user',
        select: '-password'
      }).populate({
        path: 'comments.user',
        select: '-password'
      })

      res.status(200).json(posts)

    } catch (error) {
      console.log('Error in function getPostsbyUser', error)
      res.status(500).json({Error: 'Internal server error'})
    }
  }

  static async deletePost (req, res) {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({message: 'Invalid id'})
      }

      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({message: 'Post has not found'})
      }

      if (post.user.toString() !== req.user._id.toString()) {
        return res.status(400).json({message: 'You are not authorized to delete this post'})
      }

      if (post.img) {
        await cloudinary.uploader.destroy(post.img.split('/').pop().split('.')[0]) 
      }
      
      await Post.findByIdAndDelete(post)
      res.status(200).json({message: 'Post was deleted successfully'})
      
    } catch (error) {
      console.log('Error in function deletePost', error);
      res.status(500).json({Error: 'Internal server error'});
    }
  }

  static async commentPost(req, res) {
    try {
      const postId = req.params.id;
      const { text } = req.body;
      const userId = req.user._id;
  
      if (!text) {
        return res.status(400).json({ message: 'Text field is required' });
      }
  
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const comment = { user: userId, text };
      post.comments.push(comment);
      await post.save();
  
      const updatedPost = await Post.findById(postId).populate({ path: 'comments.user', select: '-password' });

      const sortedComments = updatedPost.comments.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
  
      res.status(200).json({message: 'Comment added succesfully', data: sortedComments});
  
    } catch (error) {
      console.log('Error in function commentPost', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async likeUnlikePost (req, res) {
    try {
      const postId = req.params.id
      const userId = req.user._id

      if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      if (!postId) {
        return res.status(400).json({message: 'Id field is required'})
      }

      const post = await Post.findById(postId)

      if (!post) {
        return res.status(404).json({message: 'Post not found'})
      }

      const isLiked = post.likes.includes(userId)

      if (isLiked) {
        // dislike post
        const updatedPost = await Post.findByIdAndUpdate(postId, {$pull: {likes: userId}}, {new: true})
        await User.findByIdAndUpdate(userId, {$pull: {likedPosts: postId}})

        return res.status(200).json({message: 'Post unliked successfully', data: updatedPost.likes})
      } else {
        // like post
        const updatedPost = await Post.findByIdAndUpdate(postId, {$push: {likes: userId}}, {new: true})
        await User.findByIdAndUpdate(userId, {$push: {likedPosts: postId}})

        const newNotification = await Notification({
          type: 'like',
          from: userId,
          to: post.user
        })
  
        await newNotification.save()
        res.status(200).json({message: 'Post liked succesfully', data: updatedPost.likes})
      }

    } catch (error) {
      console.log('Error in function likeUnlikePost', error)
      res.status(500).json({message: 'Internal server error'})
    }
  }

  static async deleteComment (req, res) {
    try {
      const commentId = req.params.id
      const userId = req.user._id 

      if (!commentId) {
        return res.status(400).json({message: 'Id comment is required'})
      }

      const post = await Post.findOne({ 'comments._id': commentId})

      if (!post) {
        return res.status(404).json({message: 'Comment not found'})
      }

      const comment = await post.comments.id(commentId)

      if (comment.user.toString() !== userId.toString()) {
        return res.status(403).json({ message: 'You are not authorized to delete this comment' });
      }

      post.comments.pull(commentId)
      await post.save()

      await post.populate({
        path: 'comments.user',
        select: '-password'
      });
  
      res.status(200).json({ message: 'Comment deleted successfully', data: post.comments });

    } catch (error) {
      console.log('Error in function deleteComent ', error)
      res.status(500).json({message: 'Internal server error'})
    }
  }
}