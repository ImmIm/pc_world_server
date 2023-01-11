import dotenv from 'dotenv';
import mysql2 from 'mysql2/promise';

dotenv.config({ path: `${__dirname}/../../env/.env.local` });

export const db = mysql2.createConnection({
  multipleStatements: false,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});
