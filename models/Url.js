import { pool } from "../config/db.js"

const insertUrl = async (userId, url, shortCode) => {
    return await pool.query("INSERT INTO url (original_url, short_code, user_id) VALUES ($1, $2, $3)", [url, shortCode, userId]);
}

const findOriginalUrl = async (url) => {
    const result = await pool.query("SELECT * FROM url WHERE original_url = $1", [url]);
    return result.rows[0];
}

const findShortCode = async (shortCode) => {
    const result = await pool.query("SELECT * FROM url WHERE short_code = $1", [shortCode]);
    return result.rows[0];
}

const getUserUrls = async(userId) =>{
    const result = await pool.query("SELECT * FROM url WHERE user_id = $1", [userId]);
    return result.rows;
}

export {insertUrl, findOriginalUrl, findShortCode, getUserUrls};