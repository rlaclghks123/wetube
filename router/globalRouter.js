import express from "express";
import passport from "passport";
import routes from "../routes";

import { getJoin,postJoin, getLogin,postLogin,logout, gitHubLogin, postGitHubLogin, kakaoLogin, postKakao, getMe } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { onlyPublic,onlyPrivate } from "../localMiddleware";
import { get } from "mongoose";

const globalRouter = express.Router();

globalRouter.get(routes.join,onlyPublic, getJoin);
globalRouter.post(routes.join,onlyPublic, postJoin,postLogin);

globalRouter.get(routes.login,onlyPublic, getLogin);
globalRouter.post(routes.login,onlyPublic, postLogin);


globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout,onlyPrivate,logout);

globalRouter.get(routes.gitHub , gitHubLogin);

globalRouter.get(
     routes.gitHubCallBack,
     passport.authenticate("github",{ failureRedirect:"/login"}),
     postGitHubLogin); 

globalRouter.get(routes.kakao,
     passport.authenticate('kakao', {
          failureRedirect: '#!/login',
        }),
      kakaoLogin);

globalRouter.get(routes.kakaoCallBack,
     passport.authenticate("kakao", {failureRedirect:"#!/login"}),
     postKakao);

globalRouter.get(routes.me,getMe);

export default globalRouter;




