import {
  fetchFullProductInfo,
  fetchPackOfProducts,
} from '../database/productsDBhandlers';
import { ControllerHandler } from '../types/appType';
import { isString } from '../types/typeGuards';

export const getFullProductById: ControllerHandler = async (req, res) => {
  if (req.params.id === undefined) {
    res.status(401).send({ status: 'fail', message: 'Incorrect params.' });
    return;
  }

  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(401).send({ status: 'fail', message: 'Incorrect params.' });
    return;
  }

  const [rows] = await fetchFullProductInfo(id);
  if (!Array.isArray(rows)) {
    res.status(500).send({ status: 'fail', message: 'Something went wrong' });
    return;
  }

  if (rows.length === 0) {
    res.status(404).send({ status: 'fail', message: 'No such product' });
    return;
  }

  res.status(200).send({ status: 'sucsess', data: rows[0] });
};

export const getProducts: ControllerHandler = async (req, res) => {
  if (req.query.category === undefined) {
    res.status(401).send({ status: 'fail', message: 'Incorrect params.' });
    return;
  }
  const category = req.query.category;
  if (!isString(category)) {
    res.status(401).send({ status: 'fail', message: 'Incorrect params.' });
    return;
  }

  const currentCount =
    req.query.count === undefined ? 0 : Number(req.query.count);

  if (Number.isNaN(currentCount)) {
    res.status(401).send({ status: 'fail', message: 'Incorrect params.' });
    return;
  }
  const data = await fetchPackOfProducts(category, currentCount);
// @ts-ignore
  if (data.data === undefined) {
    res.status(401).send({ status: 'fail', message: 'Incorrect params.' });
    return;
  }
// @ts-ignore
  res.status(200).send({ status: 'sucsess', data: data });
};

export const createNewProduct: ControllerHandler = (req, res) => {
  res.status(201).send(req.body);
};

export const updateProductInfo: ControllerHandler = (req, res) => {
  res.status(204).send(req.body);
};

export const deleteProduct: ControllerHandler = (req, res) => {
  res.status(200).send(req.body);
};

const productsController = {
  getFullProductById,
  getProducts,
  createNewProduct,
  updateProductInfo,
  deleteProduct,
};

export default productsController;
