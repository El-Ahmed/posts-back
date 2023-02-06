import { Router } from 'express'
import authenticated from '../middlewares/authenticated.js'
import postRepository from '../models/post.model.js'

const postsRouter = Router()


postsRouter.get('/', async (req, res, next) => {

    const username = req.query.username
    const offset = req.query.offset || 0
    const count = 10
    let posts 
    if(username && username != '') {
        posts = await postRepository.search().where('username').equals(username).sortBy('post_date', 'DESC').return.page(offset, count)
    }
    else {
        posts = await postRepository.search().sortBy('post_date', 'DESC').return.page(offset, count)
    }
    
    res.send(posts)
})

postsRouter.post('/', authenticated, async (req, res, next) => {

    const post = {
        username: req.username,
        post_text: req.body.post_text,
        post_date: new Date()
    }
    await postRepository.createAndSave(post)
    res.json({text: "success"})

})


export default postsRouter;