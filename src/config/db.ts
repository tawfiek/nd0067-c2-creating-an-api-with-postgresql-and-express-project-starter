import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const { POSTGRES_LOCATION, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_NAME } =
    process.env;

const db = new Pool({
    host: POSTGRES_LOCATION,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_NAME,
});

export default db;
