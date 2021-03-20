import express from "express";
import { changePassword, getChangePassword, getEditProfile, postChangePassword, postEditProfile, userDetail } from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../localMiddleware";
import routes from "../routes";

const userRouter = express.Router();


userRouter.get(routes.editProfile,onlyPrivate,getEditProfile);
userRouter.post(routes.editProfile,onlyPrivate,uploadAvatar,postEditProfile);


userRouter.get(routes.changePassword,getChangePassword);
userRouter.post(routes.changePassword,postChangePassword);



userRouter.get(routes.userDetail(),userDetail);

export default userRouter;


//



