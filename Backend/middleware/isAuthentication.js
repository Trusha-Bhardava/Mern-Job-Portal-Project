// Import the jsonwebtoken library to verify and decode user authentication tokens
import jwt from "jsonwebtoken";

const isAuthentication = async (req, res, next) => {

    try {
        // Extract the authentication token from incoming request cookies
        const token = req.cookies.token;

        // If no token exists in the cookies, stop the request immediately and return an error
        if (!token) {

            return res.status(401).json({
                message: "You are not authorized, please login",
                success: false
            });

        }

 // Decrypt and verify the token using the secret key 
        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY
        );

 // If the token is structurally flawed or signature verification fails, block access
        if (!decoded) {

            return res.status(401).json({
                message: "Invalid token",
                success: false
            });

        }

// Extract the user's ID payload from the token and temporarily save it on the request object (req.id)
// This allows subsequent Controller files to know exactly which user is making this request=====

        req.id = decoded.userId;

        next();

    } 
    catch (error) 
    {
        console.log("AUTHENTICATION ERROR:",error);

        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });

    }

};

export default isAuthentication; 