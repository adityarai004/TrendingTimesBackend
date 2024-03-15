const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req,resp,next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return resp.status(401).json({message: 'Authentication Required'});
    }

    try {
        const decodedToken = jwt.verify(token,'secretkey');
        const user = await User.findById(decodedToken.userId)
        if (!user) {
            return resp.status(404).json({message: 'user not found'});
        }

        req.user = user;
        next();
    } catch (error) {
        resp.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = { authenticate };