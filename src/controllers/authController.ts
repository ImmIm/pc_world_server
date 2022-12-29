import { ControllerHandler } from '../types/appType';
import { db } from '../../server';

export const loginHandler: ControllerHandler = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ status: 'fail', message: 'Incorrect data' });
    return;
  }
  db.query(
    `SELECT * FROM users WHERE e_mail = ?;`,
    [req.body.email],
    function (err, result) {
      if (!err) {
        if (result instanceof Array && result.length !== 0) {
          // @ts-ignore
          if (result[0].password === req.body.password) {
            // @ts-ignore
            req.session.user = result;
            // @ts-ignore
            res.status(200).send({ status: 'succses', data: req.session.user });
            return;
          } else {
            res
              .status(401)
              .send({ status: 'fail', message: 'Incorrect password' });
            return;
          }
        } else {
          res.status(401).send({ status: 'fail', message: 'Incorrect email' });
          return;
        }
      } else {
        res.status(401).send({ status: 'fail', message: err });
        return;
      }
    }
  );
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

export const signUpHandler: ControllerHandler = (req, res) => {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.first_name ||
    !req.body.last_name
  ) {
    res.status(400).send({ status: 'fail', message: 'Incorrect data' });
    return;
  }

  if (
    req.body.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) === null ||
    req.body.first_name.trim().length < 4 ||
    req.body.last_name.trim().length < 4 ||
    req.body.password.trim().length < 4
  ) {
    res.status(400).send({ status: 'fail', message: 'Incorrect data' });
    return;
  }
  db.query(
    `INSERT INTO users(first_name, last_name, e_mail, password) VALUES (?,?,?,?);`,
    [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.password,
    ],
    function (err, result) {
      if (err === null) {
        // @ts-ignore
        req.session.user = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: req.body.password,
          image: 'defaultUser.png',
        };
        // @ts-ignore
        res.status(200).send({ status: 'succses', data: req.session.user });
        return;
      } else {
        res
          .status(401)
          .send({ status: 'fail', message: 'Incorrect incorrect data' });
        return;
      }
    }
  );
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

//ewrtfewrtgerwtg = user id
