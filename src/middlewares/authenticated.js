import jwt from 'jsonwebtoken';

const authenticated = (req, res, next) => {
  
    
    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(403);
    }

    try {
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        req.username = data.username;
        return next();
    } catch {
        return res.sendStatus(403);
    }


  
}

export default authenticated;