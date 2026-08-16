import { pool } from "../config/db.js";

const insertUser = async (emailId, hashPassword) =>{
    return await pool.query("INSERT INTO USERS (email_id, password_hash) VALUES ($1, $2)", [emailId, hashPassword]);
}

const findUser = async (emailId) =>{
    const result = await pool.query("SELECT * FROM USERS WHERE email_id = $1", [emailId]);
    return result.rows[0];
}
export {insertUser, findUser}