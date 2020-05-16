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
            const id = this.postService.createPost(data)
            res.status(HttpStatus.CREATED).json({id})
        } catch (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
        }
    }

    public getPosts = async (req: Request, res: Response, _next: NextFunction) => {
        const limit = parseInt(req.query.limit as string, 10)
        try {
            const posts = await this.postService.getPosts(limit)
            res.json(posts)
        } catch (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
        }
    }
}