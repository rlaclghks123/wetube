import dotenv from "dotenv";
dotenv.config();
import "./db";
import app from "./app";
import "./models/Video";
import "./models/Comment";
import "./models/User";


const PORT = process.env.PORT||4000; 
 

function  handleListening(){
    console.log(`Listening on : https://localhost:${PORT}`);
}    

app.listen(PORT,handleListening); 

