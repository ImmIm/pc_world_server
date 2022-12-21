import db from "./DBconnector";

export const isUserValid = (email: string, password: string) => {
  db.query(`SELECT * FROM users WHERE id = ?`,[], (error, results, fields) => {
    if (error) return false;
    return results;
  });
};


