
import {db} from "../../server";

export const isUserValid = (email: string) => {
 db.query(`SELECT * FROM users WHERE e_mail = ?;`, [email], function(err, result){
  return result
 })
 
};


