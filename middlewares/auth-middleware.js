const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    try {
        if (!token) {

            return res.status(401)
                .json({ message: "unauthorized http , token not provided" })

        }

        // removing the bearer  from  token 
        const jwtToken = token.replace("Bearer", "").trim();
        console.log("token from auth middleware", jwtToken);

        // next();


        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        
        const userData = await User.findOne({email: isVerified.email}).select({
            password : 0
        })
        console.log("verified token payload", userData);

        req.user = userData ;
        req.token = token;
        req.userID = userData._id;

        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(400).json({
            message: "Unauthorized, invalid token",
        });
    }
   



};

module.exports = authMiddleware;