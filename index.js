import express from "express";
import urlRouter from "./routes/urlRoutes.js"

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/', urlRouter);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})