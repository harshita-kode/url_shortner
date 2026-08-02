import { pool } from "../config/db.js"

const insertUrl = async (url, shortCode) => {
    return await pool.query("INSERT INTO url (original_url, short_code) VALUES ($1, $2)", [url, shortCode]);
}

const findOriginalUrl = async (url) => {
    const result = await pool.query("SELECT * FROM url WHERE original_url = $1", [url]);
    return result.rows[0];
}

const findShortCode = async (shortCode) => {
    const result = await pool.query("SELECT * FROM url WHERE short_code = $1", [shortCode]);
    return result.rows[0];
}

export {insertUrl, findOriginalUrl, findShortCode};