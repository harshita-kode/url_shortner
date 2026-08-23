import express from "express";
import urlRouter from "./routes/urlRoutes.js"
import userRouter from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser())

app.use('/', urlRouter);
app.use('/user', userRouter);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})