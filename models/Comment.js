import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text : {
        type : String,
        required : "Title is required"
    },
    creatAt :{
        type : Date,
        default : Date.now
    },
    video :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }
});
const model = mongoose.model("Comment",commentSchema);
export default model;