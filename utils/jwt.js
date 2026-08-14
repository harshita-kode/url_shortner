import jwt from "jsonwebtoken";
import "dotenv/config";

const generateToken = (userId)=>{
    return jwt.sign({userId : userId}, process.env.JWT_SECRET_KEY, {expiresIn : '15m'})
}

export {generateToken};