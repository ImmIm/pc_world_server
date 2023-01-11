import { ControllerHandler } from '../types/appType';
import { insertNewuser, isUserExist } from '../database/authDBhandlers';
import { isUser } from '../types/typeGuards';

export const loginHandler: ControllerHandler = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(400).send({ status: 'fail', message: 'Incorrect data' });
    return;
  }

  try {
    const [rows] = await isUserExist(email, password);
    // @ts-ignore
    const user = rows[0];

    if (isUser(user)) {
      if (user.password !== password) {
        res.status(400).send({ status: 'fail', message: 'Incorrect password' });
        return;
      }
      // @ts-ignore
      req.session.user = user;
      res.status(200).send({ status: 'succses', data: user });
    } else {
      res.status(400).send({ status: 'fail', message: 'Incorrect email' });
      return;
    }
  } catch (error) {
    // TODO change to some text 'Something went wrong'
    res.status(502).send({ status: 'fail', message: error });
  }
};

export const loginAutomatic: ControllerHandler = (req, res) => {
  // @ts-ignore
  if (req.session.user) {
    // @ts-ignore
    res.status(200).send({ status: 'succses', data: req.session.user });
  } else {
    // @ts-ignore
    res.status(401).send({ status: 'fail', message: 'Incorrect cookie' });
  }
};

export const signUpHandler: ControllerHandler = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  if (!email || !password || !first_name || !last_name) {
    res.status(400).send({ status: 'fail', message: 'Incorrect data' });
    return;
  }

  if (
    email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) === null ||
    first_name.trim().length < 4 ||
    last_name.trim().length < 4 ||
    password.trim().length < 4
  ) {
    res.status(400).send({ status: 'fail', message: 'Incorrect data' });
    return;
  }

  try {
    const [rows] = await insertNewuser(first_name, last_name, password, email);
    // @ts-ignore
    req.session.user = {
      first_name,
      last_name,
      email,
      password,
      image: 'defaultUser.png',
      phone: '',
    };
    // @ts-ignore
    res.status(200).send({ status: 'succses', data: req.session.user });
  } catch (error) {
    // TODO change to some text 'Something went wrong'
    res.status(502).send({ status: 'fail', message: error });
  }
};

export const logout: ControllerHandler = (req, res) => {
  // @ts-ignore
  req.session.user = null;
  res.clearCookie('session-id', { sameSite: 'none', secure: true });
  res.status(200).send({ status: 'succses' });
};

const authController = {
  loginHandler,
  loginAutomatic,
  signUpHandler,
  logout,
};

export default authController;

