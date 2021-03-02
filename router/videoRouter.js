import express from "express";
import { deleteVideo, getEditVideo,postEditVideo, getUpload,postUpload, videoDetail} from "../controllers/videoController";
import routes from "../routes";
import {onlyPrivate, uploadVideo} from "../localMiddleware";

const videoRouter = express.Router();

//Upload                 
videoRouter.get(routes.upload, onlyPrivate,getUpload);           
videoRouter.post(routes.upload,onlyPrivate,uploadVideo, postUpload);           

//Video Detail
videoRouter.get(routes.videoDetail(),videoDetail);

//EditVidoe
videoRouter.get(routes.editVideo(), onlyPrivate,getEditVideo);
videoRouter.post(routes.editVideo(),onlyPrivate,postEditVideo);

//Delete Video
videoRouter.get(routes.deleteVideo(),onlyPrivate,deleteVideo);

export default videoRouter;


