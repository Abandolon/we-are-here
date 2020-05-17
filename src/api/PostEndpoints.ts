import { NextFunction, Request, Response } from 'express'
import { PostService } from '../services/PostService'
import HttpStatus from 'http-status-codes'
import { Post } from '../model/Post'

export class PostEndpoints {

    constructor(
        private postService: PostService
    ) {}

    public createPost = async (req: Request, res: Response, _next: NextFunction) => {
        const data: Post = req.body
        try {
            const id = await this.postService.createPost(data)
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

    public deletePost = async  (req: Request, res: Response, _next: NextFunction) => {
        const id = req.params.id
        if (!id) {
            return res.status(HttpStatus.BAD_REQUEST).send()
        }
        try {
            console.log(id)
            const rowCount = await this.postService.deletePost(id)
            if (rowCount > 0) {
                res.status(HttpStatus.NO_CONTENT).send()
            } else {
                res.status(HttpStatus.NOT_FOUND).send()
            }
        } catch (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
        }

    }
}