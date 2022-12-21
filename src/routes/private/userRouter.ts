import express from 'express'
import userControllrer from '../../controllers/userController'

const userRouter = express.Router()

userRouter.use(express.json())

userRouter.get('/:id', userControllrer.getUserByID)
userRouter.post('/:id', userControllrer.createNewUser)
userRouter.patch('/:id', userControllrer.updateUserInfo)
userRouter.delete('/:id', userControllrer.deleteUser)



export default userRouter