import { compare } from "bcrypt";
import { bcryptPassword, comparePassword } from "../utils/bcryptPassword.js";
import { generateToken } from "../utils/jwt.js";
import { insertUser, findUser } from "../models/Users.js";

const userRegister = async (req, res)=>{
    const {email_id, password} = req.body;
    // console.log(email_id, password);
    try{
        const hashPassowrd = await bcryptPassword(password);
        await insertUser(email_id, hashPassowrd);
        return res.status(201).json({
            message : "User registered successfully"
        });

    }
    catch(err){
        return res.status(500).json({
          something : "Internal server error"
        });
    }
}

const userLogin = async (req,res)=>{
    const {email_id, password} = req.body;
    try{
        const user = await findUser(email_id);
        console.log(user);
        const hash = user.password_hash;
        console.log(hash)
        if(!hash){
            return res.status(401).json({
                error : "Invalid email or password"
            })
        }

        const isCorrect = comparePassword(password, hash);

        if(!isCorrect){
            return res.status(401).json({
                error : "Invalid email or password"
            })
        }

        return res.status(200).json({
            message : "Login successfull"
        })

        const token = generateToken(user.user_id);
        req.cookie('token', token,{
            httpOnly : true,
            secure : false
        })

    }
    catch(err){
        console.log(error);

        return res.status(500).json({
            error : "Internal server error"
        });
    }
}

export { userRegister, userLogin}