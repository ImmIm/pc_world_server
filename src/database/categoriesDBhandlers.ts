import { db } from './DBconfig';

export const fetchAllCategories = async () => {
  return await (await db).execute('SELECT * FROM categories;');
};

export const fetchCategory = async (id: number) => {
    return await (await db).execute(`SELECT * FROM categories WHERE id = ${id};`);
};
