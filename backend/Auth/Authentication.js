const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const Authentication = async (req, res, next) => {
    try {
        // 1. Get token from cookies
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Please login first' });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // 3. Check if user still exists
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // 4. Attach basic user info to request
        req.user = {
            _id: user._id,
            role: user.role,
            name: user.name,
            image: user.image
        };

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Session expired, please login again' });
        }
        return res.status(401).json({ error: 'Invalid token' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};

module.exports = { Authentication, isAdmin };