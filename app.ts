import express from 'express';
import userRouter from './src/routes/userRouter'
import morgan from 'morgan'

const app = express()

app.use('/api/v1/users', userRouter)
if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}


export default app





