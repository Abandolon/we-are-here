import express from 'express'
import { PostEndpoints } from './api/PostEndpoints'
import { PostService } from './services/PostService'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

app.use(bodyParser.json())

const postService = new PostService()
const postEndpoints = new PostEndpoints(postService)

app.post('/post', postEndpoints.createPost)
app.get('/', (_req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`App listening at port ${ port }`))