import express from "express";
import userControllrer from "../../controllers/userController";

const userRouter = express.Router();

userRouter.use(express.json());

userRouter
  .route("/:id")
  .get(userControllrer.getUserByID)
  .post(userControllrer.createNewUser)
  .patch(userControllrer.updateUserInfo)
  .delete(userControllrer.deleteUser);



export default userRouter;
 