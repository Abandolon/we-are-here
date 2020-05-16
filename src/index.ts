import express from 'express'
import { PostEndpoints } from './api/PostEndpoints'
import { PostService } from './services/PostService'
import bodyParser from 'body-parser'
import { PostRepository } from './db/PostRepository'

const app = express()

app.use(bodyParser.json())

const postRepository = new PostRepository(process.env.DATABASE_URL)
const postService = new PostService(postRepository)
const postEndpoints = new PostEndpoints(postService)

app.post('/post', postEndpoints.createPost)
app.get('/posts', postEndpoints.getPosts)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`We are here backend is listening at port ${ port }`))