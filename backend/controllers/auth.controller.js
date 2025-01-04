export class AuthController {
  static async signup (req, res) {
    res.json({data: 'You hit the signup endpoint'});
  }

  static async login (req, res) {
    res.json({data: 'You hit the login endpoint'});
  }
  
  static async logout (req, res) {
    res.json({data: 'You hit the logout endpoint'});
  }
}