import { Pool } from "pg";

const {
    DB_LOCATION,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
} = process.env;

const db = new Pool({
    host: DB_LOCATION,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

export default db;
