import passport from "passport";
import GitHubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import { gitHubLoginCallback } from "./controllers/userController";
import {kakaoLoginCallback} from"./controllers/userController";
import routes from "./routes";


passport.use(User.createStrategy()); 

passport.use( new GitHubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: `http://localhost:4000${routes.gitHubCallBack}`
},
gitHubLoginCallback
)
);

passport.use(new KakaoStrategy({
    clientID:process.env.KAKAO_ID,
    clientSecret:process.env.KAKAO_SECRET,
    callbackURL: `http://localhost:4000${routes.kakaoCallBack}`
},
kakaoLoginCallback))

passport.serializeUser(function(user,done){
    done(null,user);
});

// passport.deserializeUser(function(user,done){
//     done(null,user);
// });

passport.deserializeUser(function(id, done){
User.findById(id, function(err, user){
done(err, user);
});
});