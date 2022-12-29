import express from 'express';

import { loginAutomatic, loginHandler, logout, signUpHandler } from '../../controllers/authController';

const authRouter = express.Router({mergeParams: true});

authRouter.route('/login').post(loginHandler).get(loginAutomatic);
authRouter.route('/signup').post(signUpHandler);
authRouter.route('/logout').get(logout);

// console.log(authRouter.stack);

export default authRouter;
