import { fetchAllCategories } from '../database/categoriesDBhandlers';
import {
  fetchFiltersNames,
  fetchFiltersOptionsByName,
} from '../database/filtersDBhandlers';
import { CategoryName, ControllerHandler } from '../types/appType';
import {
  isCategoryArray,
  isCategoryNameArray,
  isString,
} from '../types/typeGuards';

const getFiltersForCategoryName: ControllerHandler = async (req, res) => {
  const categories = await getCategoriesNames();
  if (categories === false) {
    res.status(500).send({ status: 'fail', message: 'Something went wrong' });
    return;
  }

  const category = isCategoryCorrect(req.query.category, categories);
  if (category === false) {
    res.status(401).send({ status: 'fail', message: 'Incorrect query' });
    return;
  }

  const filtersNames = await getFilterNames(category);
  if (filtersNames === false) {
    res.status(500).send({ status: 'fail', message: 'Something went wrong' });
    return;
  }

  const result = await getAllFilters(filtersNames, category);

  res.status(200).send({ status: 'test', data: result });
  return;

  res.status(500).send({ status: 'fail' });
};

const getCategoriesNames = async () => {
  const [categoriesData] = await fetchAllCategories();
  if (!Array.isArray(categoriesData)) {
    return false;
  }
  if (!isCategoryArray(categoriesData)) {
    return false;
  }
  const categories = categoriesData.map((el) => {
    return el.name;
  });
  return categories;
};

const isCategoryCorrect = (category: any, categories: string[]) => {
  if (category === undefined || typeof category !== 'string') {
    return false;
  }
  if (!categories.find((el) => el === category)) {
    return false;
  }
  if (!isString(category)) {
    return false;
  }
  return category;
};

const getFilterNames = async (category: string) => {
  const rows = await fetchFiltersNames(category);
  if (rows === false) {
    return rows;
  }

  const filtersNames: string[] = [];
  if (isCategoryNameArray(rows)) {
    for (const el of rows) {
      if (
        el.Field !== 'id' &&
        el.Field !== 'category_id' &&
        el.Field !== 'product_name' &&
        el.Field !== 'product_id' &&
        el.Field !== 'main_picture'
      ) {
        filtersNames.push(el.Field);
      }
    }
  }

  return filtersNames;
};

const getAllFilters = async (options: string[], category: string) => {
  const result: {}[] = [];
  for (let option of options) {
    const [r] = await fetchFiltersOptionsByName(category, option);
    if (!Array.isArray(r)) {
      return false;
    }
    // @ts-ignore
    result.push({ optionName: option, data: r.map((el) => el[option])});
  }

  return result;
};

const filtersController = {
  getFiltersForCategoryName,
};

export default filtersController;
