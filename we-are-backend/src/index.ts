import express from 'express'
import { PostEndpoints } from './api/PostEndpoints'
import { PostService } from './services/PostService'
import bodyParser from 'body-parser'
import { PostRepository } from './db/PostRepository'

const app = express()
const port = 3000

app.use(bodyParser.json())

const postRepository = new PostRepository()
const postService = new PostService(postRepository)
const postEndpoints = new PostEndpoints(postService)

app.post('/post', postEndpoints.createPost)
app.get('/posts', postEndpoints.getPosts)

app.listen(port, () => console.log(`We are here backend is listening at port ${ port }`))