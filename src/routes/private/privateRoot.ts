import express from 'express'
import userRouter from './userRouter'



const privateRoute = express.Router()


privateRoute.use('user', userRouter)

export default privateRoute