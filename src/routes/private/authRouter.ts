import express from 'express';

import { loginAutomatic, loginHandler } from '../../controllers/authController';

const authRouter = express.Router({mergeParams: true});

authRouter.route('/login').post(loginHandler).get(loginAutomatic);
authRouter.route('/signup').post();

// console.log(authRouter.stack);

export default authRouter;
