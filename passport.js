import passport from "passport";
import gitHubStrategy from "passport-github";
import User from "./models/User";
import { gitHubLoginCallback } from "./controllers/userController";


passport.use(User.createStrategy());
passport.use( new gitHubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: "http://4000/auth/github/callback"
}),gitHubLoginCallback
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());