import { createShortCode } from "../utils/createShortCode.js";
import { insertUrl, findOriginalUrl, findShortCode } from "../models/Url.js";

const createShortUrl = async (req,res) => {
    try{
        const {url} = req.body;

        const result = await findOriginalUrl(url);
        const domain = req.protocol + '://' + req.get('host') + '/';

        if(result){
            return res.json({shortUrl : domain + result.short_code});
        }

        let shortCode;

        while(true){
            shortCode = createShortCode();

            try{
                await insertUrl(url,shortCode);
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
        console.error(err)
        
        return res.status(500).json({
            error : "Internal Server Error"
        })
    }
}

const redirectUrl = async (req, res) =>{

    const {shortCode} = req.params;
    try{
        const result = await findShortCode(shortCode);
        if(!result){
            return res.status(404).json({
                "error" : "URL not found"
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

export {createShortUrl, redirectUrl}