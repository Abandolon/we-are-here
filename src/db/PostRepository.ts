import { Post } from '../model/Post'
import { Pool } from 'pg'

export class PostRepository {

    // use JSON in Postgres: https://datavirtuality.de/blog-json-datenformat-in-postgresql-verwenden/

    private pool: Pool

    constructor(databaseUrl?: string) {
        console.log(`Using databaseUrl: ${databaseUrl}`)
        this.pool = new Pool({
            connectionString: databaseUrl,
            // TODO Re-enable again. Check that is runs local.
            /*
            ssl: {
                rejectUnauthorized: false
            }
            */
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

    public async get(limit?: number): Promise<Post[]> {
        const client = await this.pool.connect()
        try {
            let query = 'SELECT data FROM posts ORDER BY data->>\'timestamp\' DESC'
            if (limit) {
                query += ' LIMIT ' + limit
            }
            console.log(query)
            const result = await client.query(query)
            if (result) {
                return result.rows.map((value, _index, _) => value.data as Post)
            } else {
                return []
            }
        } finally {
            client.release()
        }
    }
}