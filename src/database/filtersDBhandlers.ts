import { CategoryName } from '../types/appType';
import { db } from './DBconfig';

export const fetchFiltersNames = async (category: string) => {
  const [categoryFilters] =  await (await db).execute(`SHOW columns FROM ${category};`);
  const [generalFilters] = await (await db).execute('SHOW columns FROM products')
  if(Array.isArray(categoryFilters) && Array.isArray(generalFilters)){
    return [...generalFilters, ...categoryFilters]
  }
  return false
};

export const fetchFiltersOptionsByName = async (category: string, option: string) => {
    return await (await db).execute(`SELECT DISTINCT ${option} FROM products as p JOIN ${category} as ${category[0]} ON p.id = ${category[0]}.product_id;`)
};
