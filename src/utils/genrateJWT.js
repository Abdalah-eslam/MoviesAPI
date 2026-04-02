import jwt from "jsonwebtoken";
const generateJWT = (user, res) => {
    const payload = {
        id: user.id,    
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("JWT", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }); 
    return token;
    
}
export default generateJWT;