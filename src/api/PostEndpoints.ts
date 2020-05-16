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
        try {
            this.postService.createPost(data)
            res.status(HttpStatus.CREATED).send()
        } catch (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
        }
    }

    public getPosts = async (req: Request, res: Response, _next: NextFunction) => {
        console.log(`Request query: ${req.query}`)
        //const limit = parseInt(req.query., 10)
        try {
            const posts = await this.postService.getPosts()
            res.json(posts)
        } catch (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
        }
    }
}