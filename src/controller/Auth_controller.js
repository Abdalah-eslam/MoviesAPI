import { prisma } from "../config/dbConfig.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/genrateJWT.js";
const login =async (req, res) => {
    const { email , password} = req.body;
    // Check if user exists
    const user = await prisma.user.findUnique({
        where:{
            email:email
        }});
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    // Generate JWT token here 
    const Token =createToken(user , res);
    return res.status(200).json({ message: "success", data: { 
        id: user.id
        , name: user.name, 
        email: user.email
    } 
    ,token:Token
});
    
};
const register =async (req, res) => {
    const { name,email , password} = req.body;
    const user =await prisma.user.findUnique({
        where:{
        email:email
        }});
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
 // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create new user
    
    const newUser = await prisma.user.create({
        data:{
            name:name,
            email:email,
            password:hashedPassword
        }
    
    });
    // Generate JWT token here
    const Token =createToken(newUser, res);
    return res.status(201).json({ message: "success", data: { 
        id: newUser.id
        , name: newUser.name, 
        email: newUser.email
    
    } , token:Token 
});
};

const logout =async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    });
    return res.status(200).json({ message: "success" })
};
export { login, register, logout };