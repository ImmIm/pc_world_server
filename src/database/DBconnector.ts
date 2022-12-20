import mysql from 'mysql'

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


db.connect((err) => {
    if (err) {
        console.log(`Connection with DB not succesful. Error: ${err}`);
    } else {
        console.log('DB connection succesful');
    }
})


export default db