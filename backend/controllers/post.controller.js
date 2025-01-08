
export class PostController {
  static async createPost (req, res) {
    try {
      
    } catch (error) {
      console.log('Error in function createPost', error)
      res.status(500).json({Error: 'Internal server error'})
    }
  }
}