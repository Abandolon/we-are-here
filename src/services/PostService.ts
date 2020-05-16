import { Post } from '../model/Post';
import { PostRepository } from '../db/PostRepository'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';

const TIMESTAMP_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS'

export class PostService {

    constructor(
        private repository: PostRepository
    ) {
    }

    public createPost(post: Post) {
        post.id = uuidv4()
        post.timestamp = moment().utc().format(TIMESTAMP_FORMAT)
        this.repository.create(post)
    }

    public getPosts(limit?: number) {
        const posts = this.repository.get(limit)
        return posts
    }
}