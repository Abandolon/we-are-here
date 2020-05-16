import { Post } from '../model/Post';

export class PostService {

    public createPost(post: Post) {
        console.log(`Received a new post: ${JSON.stringify(post)}`)
    }

    public getPosts() {
        // TODO
    }
}