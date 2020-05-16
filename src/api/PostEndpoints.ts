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
}