
import dotenv from 'dotenv';
import app from './app';
import mysql from 'mysql'

dotenv.config({path: `${__dirname}/env/.env.local`})

const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  });


  connection.connect((err) => {
    if (err) {
    console.log(`Connection with DB not succesful. Error: ${err}`);
    }else{
        console.log('DB connection succesful');
    }
  })

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
   console.log(`Server is running on port ${process.env.PORT}`);
})

