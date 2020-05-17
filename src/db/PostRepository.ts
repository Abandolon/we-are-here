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
            const values: any[] = []
            if (limit) {
                query += ' LIMIT $1'
                values.push(limit)
            }
            const result = await client.query(query, values)
            if (result) {
                return result.rows.map((value, _index, _) => value.data as Post)
            } else {
                return []
            }
        } finally {
            client.release()
        }
    }

    public async delete(id: string): Promise<number> {
        const client = await this.pool.connect()
        try {
            const query = `DELETE FROM posts WHERE data->>'id' = $1`
            const result = await client.query(query, [id])
            return result.rowCount
        } finally {
            client.release()
        }
    }
}