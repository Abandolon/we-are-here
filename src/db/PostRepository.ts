import { Post } from '../model/Post'
import { Pool } from 'pg'

export class PostRepository {

    // use JSON in Postgres: https://datavirtuality.de/blog-json-datenformat-in-postgresql-verwenden/

    private pool: Pool

    constructor(databaseUrl?: string) {
        this.pool = new Pool({
            connectionString: databaseUrl,
            ssl: {
                rejectUnauthorized: false
            }
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
                return result.rows.map((value, _index, _) => {
                    return JSON.parse(value.data) as Post
                })
            }
        } finally {
            client.release()
        }
        return []
    }
}