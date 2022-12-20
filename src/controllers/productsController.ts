import { Request, Response } from "express";


type ControllerHandler = (req: Request, res: Response) => void

export const getProductById: ControllerHandler = (req, res) => {
    res.status(200).send(`User with id: ${req.params.id}`)
};

export const getProducts: ControllerHandler = (req, res) => {
    res.status(200).send(`User with id: ${req.params}`)
};

export const createNewProduct: ControllerHandler = (req, res) => {
    res.status(201).send(req.body)
}

export const updateProductInfo: ControllerHandler = (req, res) => {
    res.status(204).send(req.body)
}

export const deleteProduct: ControllerHandler = (req, res) => {
    res.status(200).send(req.body)
}

const productsController = {
    getProductById,
    getProducts,
    createNewProduct,
    updateProductInfo,
    deleteProduct
}

export default productsController