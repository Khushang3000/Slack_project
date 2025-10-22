import express from 'express';
import dotenv from "dotenv";
import { ENV } from './config/env';


const app = express();


// const PORT=process.env.PORT||5001;

//endpoint 
app.get('/',(req,res)=>{
    res.send('Hello World');
    //remember res.send sends a string, but res.json sends the json object.
})

console.log('Mongodb url is', ENV.MONGODB_URI)//this runs on the server file, when this server file runs, and the .get is through express router.


app.listen(ENV.PORT,()=>{
    console.log("Server is listening on port", ENV.PORT)
})