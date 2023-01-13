import { db } from './DBconfig';

export const fetchPackOfProducts = async (category: number, ofset: number) => {
  return await (
    await db
  ).execute(
    `SELECT * FROM products WHERE category_id = ${category} LIMIT ${ofset}, 10;`
  );
};

export const fetchFullProductInfo = async (id: number) => {
  return await (
    await db
  ).execute(
    `SELECT product_name, frequency, model, socket, n_cores, producer_country, producer_info, price, main_picture FROM products as p JOIN cpu as c ON p.id = c.product_id WHERE id = ${id};`
  );
};
