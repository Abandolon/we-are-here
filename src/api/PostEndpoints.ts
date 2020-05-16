import { NextFunction, Request, Response } from 'express'
import { PostService } from '../services/PostService'
import HttpStatus from 'http-status-codes'
import { Post } from '../model/Post'

export class PostEndpoints {

    constructor(
        private postService: PostService
    ) {}

    public createPost = (req: Request, res: Response, _next: NextFunction) => {
        const data: Post = req.body
        this.postService.createPost(data)
        res.status(HttpStatus.CREATED).send()
    }

    public getPosts = (req: Request, res: Response, _next: NextFunction) => {
        console.log(req.query)
        //const limit = parseInt(req.query., 10)
        const posts = this.postService.getPosts()
        res.json(posts)
    }
}