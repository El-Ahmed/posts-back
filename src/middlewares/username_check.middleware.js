
import userRepository from "../models/user.model.js";

const usernameCheck = async (req,res,next) => {
    
    const username = req.body.username;

    const usersCount = await userRepository.search().where('username').equals(username).return.count()
    if (usersCount>0) {
        res.status(409).json({ text: 'username in use' })
        return
    }
    return next();
}

export default usernameCheck