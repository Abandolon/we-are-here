import { Post } from '../model/Post'
import { Pool } from 'pg'

export class PostRepository {

    // use JSON in Postgres: https://datavirtuality.de/blog-json-datenformat-in-postgresql-verwenden/

    private pool: Pool

    constructor(databaseUrl?: string) {
        console.log(`Using databaseUrl: ${databaseUrl}`)
        this.pool = new Pool({
            connectionString: databaseUrl,

        });
    }



    public async create(post: Post) {
        const client = await this.pool.connect()
        try {
            await client.query(`INSERT INTO posts VALUES (\'${JSON.stringify(post)}\')`)
        } finally {
            client.release()
        }
    }

    public async get(_limit?: number): Promise<Post[]> {
        const client = await this.pool.connect()
        try {
            const result = await client.query('SELECT data FROM posts')
            if (result) {
                const posts = result.rows.map((value, _index, _) => value.data as Post)
                return posts
            } else {
                return []
            }
        } finally {
            client.release()
        }
    }
}