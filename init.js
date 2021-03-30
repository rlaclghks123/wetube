import "./models/Video";
import "./db";
import "./models/Comment";
import "./models/User";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT||4000; 
 

function  handleListening(){
    console.log(`Listening on : https://localhost:${PORT}`);
}    

app.listen(PORT,handleListening); 

