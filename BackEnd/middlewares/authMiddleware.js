const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const validateToken = async (req, res, next) => {
    try {
        var token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'No token Found' });
        }
        token = token.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(403).json({ message: 'Token expired', status: 'token-expire' });
                }
                return res.status(403).json({ message: 'Failed to authenticate token' });
            }
            req.body.payLoad = decoded;
            next();
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

function requireRoles(roles) {
    return (req, res, next) => {
        const userRoles = req.user.role;
        if (roles.includes(userRoles)) {
            next();
        }
        else {
            res.status(403).json({ message: 'Permission Denied' });
        }
    }
}

module.exports = {
    validateToken,
    requireRoles
};