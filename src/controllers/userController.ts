
import { ControllerHandler } from "../types/appType";

export const getUserByID: ControllerHandler = (req, res) => {
    res.status(200).send(`User with id: ${req.params.id}`)
};

export const createNewUser: ControllerHandler = (req, res) => {
    res.status(201).send(req.body)
}

export const updateUserInfo: ControllerHandler = (req, res) => {
    res.status(204).send(req.body)
}

export const deleteUser: ControllerHandler = (req, res) => {
    res.status(200).send(req.body)
}

const userController = {
    getUserByID,
    createNewUser,
    updateUserInfo,
    deleteUser
}

export default userController