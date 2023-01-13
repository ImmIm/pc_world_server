import {
  fetchAllCategories,
  fetchCategory,
} from '../database/categoriesDBhandlers';
import { ControllerHandler } from '../types/appType';

const getAllCategories: ControllerHandler = async (req, res) => {
  try {
    const [rows] = await fetchAllCategories();

    res.status(200).send({ status: 'sucsess', data: rows });
  } catch (error) {
    res.status(500).send({ status: 'fail', message: error });
  }
};

const getCategory: ControllerHandler = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(401).send({ status: 'fail', message: 'Incorrect params.' });
    return;
  }

  try {
    const [rows] = await fetchCategory(id);

    if (!Array.isArray(rows)) {
      res.status(500).send({ status: 'fail', message: 'Something went wrong' });
      return;
    }

    if (rows.length === 0) {
      res.status(404).send({ status: 'fail', message: 'No such category' });
      return;
    }

    res.status(200).send({ status: 'sucsess', data: rows[0] });
    return;
  } catch (error) {
    res.status(500).send({ status: 'fail', message: error });
    return;
  }
};

const categoriesController = {
  getAllCategories,
  getCategory,
};

export default categoriesController;
