const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// protected routing - token based - requires sign in

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "jwtSecret"

const requireSignIn = async (req, res, next) => {
    // catching the token
    let token = req.headers.authorization;
    // extract Bearer word from jwt token
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7);
    } else {
        return res.json({
            success: false,
            message: 'Unauthentic user'
        })
    }
    // decoding the user
    const tokenSecret = JWT_SECRET
    try {
        const decoded = jwt.verify(token, tokenSecret)
        req.user = decoded;
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized User',
            error: error.message
        });
    }
}

module.exports = requireSignIn