import { isStringArray } from '../types/typeGuards';
import { db } from './DBconfig';

const fetchCategoryId = async (category: string) => {
  const names = await (await db).execute('SELECT name FROM categories;');
  //@ts-ignore
  if (!isStringArray(names) && names.find((el) => el === category)) {
    return [];
  }

  const [rows] = await (
    await db
  ).execute('SELECT id FROM categories WHERE name=?;', [category]);

  if (Array.isArray(rows)) {
    if (rows.length === 0) {
      return [];
    }
  }
  // @ts-ignore
  return rows[0].id;
};

export const fetchCategoryoptions = async (category: string) => {
  const catId = await fetchCategoryId(category);

  const [fields] = await (
    await db
  ).execute(
    //@ts-ignore
    `SELECT * FROM products JOIN ${category} ON products.id=${category}.product_id WHERE category_id = ${catId} LIMIT 1;`
  );
  // @ts-ignore
  return Object.keys(fields[0]);
};

export const fetchPackOfProducts = async (
  category: string,
  ofset: number,
  filters?: string[],
  query?: {}
) => {
  const catID: number = await fetchCategoryId(category);


  if (query === undefined || filters === undefined) {
  const count = await fetchCount(catID);

    const data = await fetchProducts(category, catID, ofset);

    return { data: data, count: count };
  } else {

    const data = await fetchFilteredProducts(
      category,
      catID,
      ofset,
      filters,
      query
    );

    return data;
  }
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

const fetchFilteredCount = async(url: string) => {
  let [rows] = await (
    await db
  ).execute(
    //@ts-ignore
    url
  );
  if (Array.isArray(rows)) {
    if (rows.length === 0) {
      return [];
    }
  }
  //@ts-ignore
  return rows[0]['COUNT(*)'];
}

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

const fetchFilteredProducts = async (
  category: string,
  category_id: number,
  ofset: number,
  filters: string[],
  query: {}
) => {
  let filterQ = '';

  for (const option of filters) {
    // @ts-ignore
    const queryValue: number[] | string | string[] | undefined = query[option];

    if (queryValue !== undefined) {
      if (Number.isNaN(Number(queryValue)) && !Array.isArray(queryValue)) {
        //one string value

        filterQ += ` AND ${option}=${queryValue}`;
      } else if (Array.isArray(queryValue)) {
        //array options
        if (Number.isNaN(Number(queryValue[0]))) {
          //string
          let splitted = queryValue.join();

          filterQ += ` AND ${option} IN (${splitted})`;
        } else {
          //number

          return [];
          // const ar = queryValue.map((el) => Number(el));
          // let splitted = ar.join();
          // filterQ += ` AND ${option} BETWEEN value1 AND value2 IN (${splitted})`;
        }
      } else if (!Number.isNaN(Number(queryValue))) {
        filterQ += ` AND ${option} >= ${queryValue}`;
      }
    }
  }


  const count: number = await fetchFilteredCount(`SELECT COUNT(*) FROM products JOIN ${category} ON products.id = ${category}.product_id WHERE category_id = ${category_id} ${filterQ}`)

  let [rows] = await (
    await db
  ).execute(
    //@ts-ignore
    `SELECT * FROM products JOIN ${category} ON products.id = ${category}.product_id WHERE category_id = ${category_id} ${filterQ} ` 
  );

  // console.log(`SELECT * FROM products JOIN ${category} ON products.id = ${category}.product_id WHERE category_id = ${category_id} ${filterQ} LIMIT ${ofset}, 10;`);
  

  if (Array.isArray(rows)) {
    if (rows.length === 0) {
      return [];
    }
  }

  //@ts-ignore
  return {data: rows, count: count};
};



export const fetchFullProductInfo = async (id: number) => {
  return await (
    await db
  ).execute(
    `SELECT product_name, frequency, model, socket, n_cores, producer_country, producer_info, price, main_picture FROM products as p JOIN cpu as c ON p.id = c.product_id WHERE id = ${id};`
  );
};
