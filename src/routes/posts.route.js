import { Router } from 'express'
import postRepository from '../models/post.model.js'

const postsRouter = Router()


postsRouter.get('/', async (req, res, next) => {

    const username = req.query.username
    const offset = req.query.offset || 0
    const count = 10
    let posts 
    if(username) {
        posts = await postRepository.search().where('username').equals(username).return.page(offset, count)
    }
    else {
        posts = await postRepository.search().return.page(offset, count)
    }
    
    res.send(posts)
})


export default postsRouter;