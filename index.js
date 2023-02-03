import express from 'express';
import postsRouter from './src/routes/posts.route.js';
import { config } from 'dotenv';
config();

const app = express();





app.use('/api/posts', postsRouter)



const port = process.env.PORT || 5050

app.listen(port, ()=> console.log("listening to port: " + port))