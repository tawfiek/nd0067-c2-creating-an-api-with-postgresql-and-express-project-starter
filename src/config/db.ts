import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const { POSTGRES_LOCATION, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_NAME } =
    process.env;

const db = new Pool({
    database: POSTGRES_NAME,
    host: POSTGRES_LOCATION,
    password: POSTGRES_PASSWORD,
    user: POSTGRES_USER,
});

export default db;
