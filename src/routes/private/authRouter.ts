import express from 'express';

import { loginHandler } from '../../controllers/authController';

const authRouter = express.Router({mergeParams: true});

authRouter.route('/login').post(loginHandler);
authRouter.route('/signup').post();

// console.log(authRouter.stack);

export default authRouter;
