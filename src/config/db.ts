import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const { POSTGRES_LOCATION, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_NAME, ENV, POSTGRES_NAME_TEST } =
    process.env;

let db: Pool;

if (ENV === 'test') {

    db = new Pool({
        database: POSTGRES_NAME_TEST,
        host: POSTGRES_LOCATION,
        password: POSTGRES_PASSWORD,
        user: POSTGRES_USER,
    });

} else {
    db = new Pool({
        database: POSTGRES_NAME,
        host: POSTGRES_LOCATION,
        password: POSTGRES_PASSWORD,
        user: POSTGRES_USER,
    });
}

export default db;
