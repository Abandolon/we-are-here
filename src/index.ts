import express from 'express'
import { PostEndpoints } from './api/PostEndpoints'
import { PostService } from './services/PostService'
import bodyParser from 'body-parser'
import { PostRepository } from './db/PostRepository'
import { banner } from './banner'
import cors from 'cors'

const app = express()

var allowedOrigins = [
    'http://localhost:3000',
    'https://we-are-pride.herokuapp.com'
];
app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(bodyParser.json())

const postRepository = new PostRepository(process.env.DATABASE_URL || 'postgres://localhost')
const postService = new PostService(postRepository)
const postEndpoints = new PostEndpoints(postService)

app.post('/post', postEndpoints.createPost)
app.delete('/post/:id', postEndpoints.deletePost)
app.get('/posts', postEndpoints.getPosts)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`${banner}Backend is listening at port ${ port }`))
