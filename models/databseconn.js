import mongoose from "mongoose";

export default async function Databaseconnection(){
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("data base connected")


    }catch(error){
        console.log("unable to connect database", error.message)

    }
}