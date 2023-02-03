const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const app = express();


app.get('/hello', (req,res) => {
    res.send("hello world");
})

const port = process.env.PORT || 5050

app.listen(port, ()=> console.log("listening to port: " + port))