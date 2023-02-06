import { Router } from 'express'
import userRepository from '../models/user.model.js'
import usernameCheck from '../middlewares/username_check.middleware.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userRouter = Router()


userRouter.post('/register', usernameCheck, async (req, res, next) => {

    const user = {
        username: req.body.username,
        password: req.body.password
    }

    bcrypt.hash(user.password, 10, async function(err, hash) {
        const hashUser = {username:user.username, password:hash};
        await userRepository.createAndSave(hashUser);
        res.status(200).json({text: "success"})
    });
    

})

userRouter.post('/login', async (req, res, next) => {

    const user = {
        username: req.body.username,
        password: req.body.password
    }

    const userArr = await userRepository.search().where('username').equals(user.username).return.all();

    if (!userArr || userArr.length == 0 || !userArr[0]) {
        res.status(404).json({text: "username not found"})
        return
    }
    const realUser = userArr[0]

    bcrypt.compare(user.password, realUser.password).then(right_password => {
        if (!right_password) {
            res.status(403).json({status: "wrong password"})
            return
        }
        const token = jwt.sign({username:user.username}, process.env.TOKEN_SECRET); 
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: false,
        })
        .json({text: "success"})
    })

})

userRouter.get("/logout", (req, res) => {
  return res
    .clearCookie("access_token")
    .json({ text: "success" });
});


export default userRouter;