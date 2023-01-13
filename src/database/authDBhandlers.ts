import { db } from './DBconfig';

export const isUserExist = async (email: string, password: string) => {
  return await (
    await db
  ).execute('SELECT * FROM users WHERE e_mail = ?;', [email]);
};

export const insertNewuser = async (
  first_name: string,
  last_name: string,
  password: string,
  email: string
) => {
  return await (
    await db
  ).execute(
    'INSERT INTO users(first_name, last_name, e_mail, password) VALUES (?,?,?,?);',
    [first_name, last_name, email, password]
  );
};
