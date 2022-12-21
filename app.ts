import express from 'express';
import userRouter from './src/routes/private/userRouter'
import morgan from 'morgan'

const app = express()

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

app.use('/api/v1/users', userRouter)

export default app





