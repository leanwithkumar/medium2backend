import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const mongo_url = process.env.MONGO_URL;

export default async function Databaseconnection(){
    try{
        await mongoose.connect(mongo_url)
        console.log("data base connected")


    }catch(error){
        console.log("unable to connect database", error.message)

    }
}