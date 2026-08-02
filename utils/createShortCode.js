import { nanoid } from "nanoid";

const createShortCode = () =>{
    return nanoid(8);
}

export {createShortCode};