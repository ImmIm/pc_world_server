import dotenv from 'dotenv';
import app from './app';
import mysql2 from 'mysql2';

dotenv.config({ path: `${__dirname}/env/.env.local` });

export const db = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  
});

db.connect((err) => {
  if (err) {
    console.log(`Connection with DB not succesful. ${err}`);
  } else {
    console.log('DB connection succesful');
  }
});



const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
