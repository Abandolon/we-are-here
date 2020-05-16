import { Post } from '../model/Post';

export class PostService {

    public createPost(post: Post) {
        console.log('Received a new post: ' + post)
    }

    public getPosts() {
        // TODO
    }
}