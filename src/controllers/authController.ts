import { ControllerHandler } from "../types/appType";
import { isUserValid } from "../database/authDBhandlers";
import {db} from "../../server";

export const loginHandler: ControllerHandler = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ status: "fail" });
  }

  console.log(isUserValid(req.body.email));
  


 
  



};

const authController = {
  loginHandler,
};

export default authController;



//ewrtfewrtgerwtg = user id