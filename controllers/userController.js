import { compare } from "bcrypt";
import { bcryptPassword, comparePassword } from "../utils/bcryptPassword.js";
import { generateToken } from "../utils/jwt.js";
import { insertUser, findUser } from "../models/Users.js";

const userRegister = async (req, res)=>{
    const {email_id, password} = req.body;
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
        const hash = user.password_hash;
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

        const token = generateToken(user.user_id);

        res.cookie('token', token,{
            httpOnly : true,
            secure : false
        })

        return res.status(200).json({
            message : "Login successfull"
        })


    }
    catch(err){
        console.log(err);

        return res.status(500).json({
            error : "Internal server error"
        });
    }
}

export { userRegister, userLogin}