import { isStringArray } from '../types/typeGuards';
import { db } from './DBconfig';

const fetchCategoryId = async (category: string) => {
  const names = await (await db).execute('SELECT name FROM categories;');
  //@ts-ignore
  if (!isStringArray(names) && names.find((el) => el === category)) {
    return [];
  }

  return await (
    await db
  ).execute('SELECT id FROM categories WHERE name=?;', [category]);
};

export const fetchPackOfProducts = async (category: string, ofset: number) => {
  const [rows] = await fetchCategoryId(category);

  if (Array.isArray(rows)) {
    if (rows.length === 0) {
      return [];
    }
  }
  //@ts-ignore
  const count = await fetchCount(rows[0].id);
  //@ts-ignore
  const data = await fetchProducts(category, rows[0].id, ofset);
  return {data: data, length: count};
};

const fetchCount = async (category: number) => {
  let [rows] = await (
    await db
  ).execute(
    //@ts-ignore
    `SELECT COUNT(*) FROM products WHERE category_id = ${category};`
  );
  if (Array.isArray(rows)) {
    if (rows.length === 0) {
      return [];
    }
  }
  //@ts-ignore
  return rows[0]['COUNT(*)'];
};

const fetchProducts = async (
  category: string,
  category_id: number,
  ofset: number
) => {
  let [rows] = await (
    await db
  ).execute(
    //@ts-ignore
    `SELECT * FROM products JOIN ${category} ON products.id=${category}.product_id WHERE category_id = ${category_id} LIMIT ${ofset}, 10;`
  );
  if (Array.isArray(rows)) {
    if (rows.length === 0) {
      return [];
    }
  }
  //@ts-ignore
  return rows;
};

export const fetchFullProductInfo = async (id: number) => {
  return await (
    await db
  ).execute(
    `SELECT product_name, frequency, model, socket, n_cores, producer_country, producer_info, price, main_picture FROM products as p JOIN cpu as c ON p.id = c.product_id WHERE id = ${id};`
  );
};
