import { createShortCode } from "../utils/createShortCode.js";
import { insertUrl, findOriginalUrl, findShortCode, getUserUrls} from "../models/Url.js";

const createShortUrl = async (req,res) => {
    try{
        const {url} = req.body;
        const userId = req.user.userId;
        const result = await findOriginalUrl(url);
        const domain = req.protocol + '://' + req.get('host') + '/';

        if(result){
            return res.json({shortUrl : domain + result.short_code});
        }

        let shortCode;

        while(true){
            shortCode = createShortCode();

            try{
                await insertUrl(userId, url, shortCode);
                break;
            }
            catch(err){
                if(err.code === "23505") {
                    continue; 
                }
            }
            throw err;

        }
        res.json({"shortUrl" : domain + shortCode});

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            error : "Internal Server Error"
        });
    }
}

const redirectUrl = async (req, res) =>{

    const {shortCode} = req.params;
    try{
        const result = await findShortCode(shortCode);
        if(!result){
            return res.status(404).json({
                "error" : "URL not found here?"
            });
        }
        return res.redirect(result.original_url)
    }
    catch(err){
        res.status(500).json({
            "error" : "Internal Server error"
        });
    }
}

const getUrls = async (req,res) =>{
    try{
        const userId = req.user.userId;
        const result = await getUserUrls(userId);
        result.forEach(res => {
            console.log(res.original_url+" - "+res.short_code);
        });
    }
    catch(err){
        res.status(500).json({
            "error" : "Internal Server Error"
        })
    }
}

export {createShortUrl, redirectUrl, getUrls}