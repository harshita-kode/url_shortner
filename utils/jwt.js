import jwt from "jsonwebtoken";
import "dotenv/config";

const generateToken = (userId)=>{
    return jwt.sign({userId : userId}, process.env.JWT_SECRET_KEY, {expiresIn : '15m'})
}


const validateJwt = (token) =>{
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

export {generateToken, validateJwt};