const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports =(req, res, next) => {
    const token = req.header("token");
        if (!token) {
            return res.status(403).json('Not authorized');
        }

    try{
        
        const payload = jwt.verify(token, process.env.jwtSecret);
        req.user = payload.user;
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(403).json('Not authorized');
    }
};
