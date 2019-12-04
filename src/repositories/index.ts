
// PostgreSQL config
import { Pool } from 'pg';

export const connectionPool: Pool = new Pool({
    user: process.env['GARDEN_BOOK_USERNAME'],
    host: process.env['GARDEN_BOOK_HOST'],
    password: process.env['GARDEN_BOOK_PASSWORD'],
    database: process.env['GARDEN_BOOK_DATABASE'],
    port: 5432,
    max: 5
});
