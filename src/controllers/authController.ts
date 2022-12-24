import { ControllerHandler } from '../types/appType';
import { db } from '../../server';

export const loginHandler: ControllerHandler = (req, res) => {
  if (!req.body.email || !req.body.password) {    
    res.status(400).send({ status: 'fail', message: 'Incorrect data' });
    return
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
            res.status(200).send({status: 'succses', data: req.session.user});
            return
          } else {
            res
              .status(401)
              .send({ status: 'fail', message: 'Incorrect password' });
              return
          }
        } else {
          res.status(401).send({ status: 'fail', message: 'Incorrect email' });
          return
        }
      } else {
        res.status(401).send({ status: 'fail', message: err });
        return
      }
    }
  );
};

export const loginAutomatic: ControllerHandler = (req, res) => {
  // @ts-ignore
  if (req.session.user) {
    // @ts-ignore
    res.status(200).send({status: 'succses', data: req.session.user});
  } else {
    // @ts-ignore
    res.status(401).send({ status: 'fail', message: 'Incorrect cookie'});
  }
};

const authController = {
  loginHandler,
  loginAutomatic
};

export default authController;

//ewrtfewrtgerwtg = user id
