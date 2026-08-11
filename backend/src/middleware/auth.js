import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'porulonstack_super_secret_jwt_key_2026');
      const user = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } });
      if (user) {
        req.user = user.toJSON();
        req.user._id = user.id; // Compatibility mapping for admin frontend
        return next();
      }
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
