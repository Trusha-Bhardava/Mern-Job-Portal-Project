import jwt from "jsonwebtoken";

const isAuthentication = async (req, res, next) => {

    try {

        const token = req.cookies.token;

        // =========================
        // CHECK TOKEN
        // =========================

        if (!token) {

            return res.status(401).json({
                message: "You are not authorized, please login",
                success: false
            });

        }


        // =========================
        // VERIFY TOKEN
        // =========================

        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY
        );


        // =========================
        // CHECK DECODED DATA
        // =========================

        if (!decoded) {

            return res.status(401).json({
                message: "Invalid token",
                success: false
            });

        }


        // =========================
        // SAVE USER ID
        // =========================

        req.id = decoded.userId;


        // =========================
        // NEXT
        // =========================

        next();

    } catch (error) {

        console.log(
            "AUTHENTICATION ERROR:",
            error
        );

        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });

    }

};

export default isAuthentication; 