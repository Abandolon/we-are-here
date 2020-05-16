import { Post } from '../model/Post';
import { PostRepository } from '../db/PostRepository'

export class PostService {

    constructor(
        private repository: PostRepository
    ) {
    }

    public createPost(post: Post) {
        console.log(`Received a new post: ${JSON.stringify(post)}`)
        this.repository.create(post)
    }

    public getPosts(limit?: number) {
        const posts = this.repository.get(limit)
        return posts
    }
}