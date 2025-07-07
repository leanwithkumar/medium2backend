import bcrypt from "bcrypt"
import { userValidation }from "../validations/uservalidation.js";
import users from "../models/users.model.js";

const signup  = async(req, res)=>{
    try{
       const validuser = userValidation.parse(req.body)

       const duplicate = await users.findOne({email : validuser.email})

       if(duplicate){
        return res.status(400).json({
            message : "this email has already been registered"
        })
       }

       const hashpassword = await bcrypt.hash(validuser.password, 10)
       
       const newuser = new users({
        username : validuser.username,
        email : validuser.email,
        password : hashpassword
       })

       await newuser.save()
       res.status(201).json({
        message : `${validuser.email} has succesfully registered`
       })
    }
    catch(err){
        if (err.name === "ZodError") {
        const messages = err.errors.map(e => e.message);
        return res.status(400).json({
         errors: messages
        });
        }
        res.status(400).json({
            message : "unable to register user"
        })
    }
}
export default signup