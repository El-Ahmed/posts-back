import express from 'express';
import postsRouter from './src/routes/posts.route.js';
import userRouter from './src/routes/user.route.js';
import { config } from 'dotenv';
config();
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




app.use('/api/posts', postsRouter)
app.use('/api/user', userRouter)



const port = process.env.PORT || 5050

app.listen(port, ()=> console.log("listening to port: " + port))