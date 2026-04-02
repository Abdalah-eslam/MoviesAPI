import {prisma} from "../config/dbConfig.js";
import jwt from "jsonwebtoken";

const AuthMiddleware = async (req, res, next) => {
    console.log(`Authmiddleware reached`);
    
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    else if (req.cookies?.JWT) {
        token = req.cookies.JWT;
    }
    else {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const User = await prisma.user.findUnique({
            where: {
                id: decoded.id, 
            }
        });
        if (!User) {
            return res.status(401).json({ message: "User no longer exists" });
        }
        req.user = User;
        next();
        
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};
export { AuthMiddleware };