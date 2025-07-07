import blogs from "../models/blogs.model.js"

export const alluserblogs = async(req, res)=>{
    const { userId } = req.params
try{
    const userBlogs = await blogs.find({author : userId}).sort({createdAt : -1})
    res.status(200).json(userBlogs)

}catch(err){
    res.status(400).json({
        message : "unable to fetch blogs"
    })

}
}