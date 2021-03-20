import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from"passport";
import mongoose from "mongoose";
import session from "express-session";
// import MongoStore from "connect-mongo";
import {localMiddleware} from "./localMiddleware";
import routes from "./routes";
import  globalRouter  from "./router/globalRouter";
import  userRouter  from "./router/userRouter";
import  videoRouter  from "./router/videoRouter";

import "./passport";


const  app = express();
  
const MongoStore = require("connect-mongo").default;


app.set("view engine", "pug");

app.use("/uploads",express.static("uploads"));
app.use("/static",express.static("static"));

app.use(helmet({ contentSecurityPolicy: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(morgan("dev"));
app.use(
    session({
    secret : process.env.COOKIE_SECRET,
    resave :true,
    saveUninitialized:false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use(localMiddleware);

app.use(routes.home,globalRouter);
app.use(routes.users,userRouter);
app.use(routes.videos,videoRouter);

export default app;