import express from 'express';
import morgan from 'morgan';
import authRouter from './src/routes/private/authRouter';
import productsRouter from './src/routes/public/productsRouter';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';

const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'UPDATE', 'DELETE'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    name: 'session-id',
    secret: 'SuperSecretKey146Info', // Secret key,
    saveUninitialized: false,
    resave: false,
  })
);

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use('/static', express.static('public'))

app.use(express.json());
// ROUTES
app.use('/api/v1/private/auth', authRouter);
app.use('/api/v1/public/products', productsRouter);

export default app;
