import { validateJwt } from "../utils/jwt.js";

const validateUser = (req,res,next)=>{
    try{
        const token = req.cookies.token
        const decoded = validateJwt(token);
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(401).json({
            error : "Invalid or expired token"
        })
    }
}

export {validateUser};