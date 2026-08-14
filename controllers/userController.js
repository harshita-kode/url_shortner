import { compare } from "bcrypt";
import { comparePassword } from "../utils/bcryptPassword";
import { generateToken } from "../utils/jwt";

const userRegister = async (req, res)=>{
    const {emailId, password} = req.body;
    try{
        const hashPassowrd = bcryptPassword(password);
        await inserUser(emailId, hashPassowrd);
        return res.status(201).json({
            message : "User registered successfully"
        });

    }
    catch(err){
        return res.status(500).json({
          error : "Internal server error"
        });
    }
}

const userLogin = async (req,res)=>{
    const {emailId, password} = req.body;
    try{
        const user = await findUser(emailId);
        const hash = user.hash_password
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

    }
    catch(err){
        console.log(error);

        return res.status(500).json({
            error : "Internal server error"
        });
    }
}