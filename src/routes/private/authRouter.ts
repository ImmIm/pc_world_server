import express from 'express'

const authRouter = express.Router()

authRouter.use(express.json())

authRouter.route('/login').post()
authRouter.route('/signup').post()


export default authRouter