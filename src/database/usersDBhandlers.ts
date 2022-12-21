import db from "./DBconnector";
import { User } from "../types/appType";



export const userInfoQuery = (id: number) => {
    db.query(`SELECT * FROM users WHERE id = ${id}`, (error, results, fields) => {
        if (error) return false;
        return results;
    })
}

export const userCreationQuery = (user: User) => {
    db.query(`INSERT INTO users(first_name, last_name, email, password) VALUES(${user.firstname},${user.lastName},${user.email},${user.password})`,(error, results, fields) => {
        if (error) return false;
        return results;
    })
}

export const userUpdateQuey = (id: number, user : User) => {


}