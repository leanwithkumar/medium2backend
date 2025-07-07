import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    }, 
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true
    },
    tags: {
    type: [String], 
    default: []
  }
},
    {
        timestamps : true,
    }

    
)

const blogs =  mongoose.model("blogs", blogSchema)

export default blogs