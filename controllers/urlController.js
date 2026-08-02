import { createShortCode } from "../utils/createShortCode.js";

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

export {createShortUrl}