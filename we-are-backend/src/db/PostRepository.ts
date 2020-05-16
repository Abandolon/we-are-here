import { Post } from '../model/Post'

export class PostRepository {

    public posts: Post[] = []

    public create(post: Post) {
        this.posts.push(post)
    }

    public get(limit?: number): Post[] {
        if (limit) {
            return this.posts.slice(-limit)
        }
        return this.posts
    }
}