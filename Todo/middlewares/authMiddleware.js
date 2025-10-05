const { JsonWebTokenError } = require("jsonwebtoken");

const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            success:false,
            message:"Invalid token"
        })
    
    }
     const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWR_SECRET_KEY);  
    // decoded will look like: { id: 'userIdHere', iat: 1696153412, exp: 1696157012 }

    req.user = decoded; // attach decoded info to req.user
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
