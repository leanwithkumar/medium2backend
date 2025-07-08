import users from "../models/users.model.js";
import { signinvalidation } from "../validations/signinvalidation.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const Signin = async (req, res) => {
  console.log("request recieved")
  try {
    const validuser = signinvalidation.parse(req.body);
    const verifyuser = await users.findOne({ email: validuser.email });

    if (!verifyuser) {
      return res.status(400).json({ message: "User not found" });
    }

    const checkpassword = await bcrypt.compare(validuser.password, verifyuser.password);
    if (!checkpassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    if (!process.env.SECRET_KEY) {
      throw new Error("JWT secret key is not configured");
    }

    const token = jwt.sign(
      { id: verifyuser._id, email: verifyuser.email },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.cookie("medium2token", token, {
    httpOnly: true,
    secure: true,       
    sameSite: "None",     
    maxAge: 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({
      message: "Login successful",
      username: verifyuser.username,
      email: verifyuser.email,
      userId: verifyuser._id

    });
  } catch (err) {
    if (err.name === "ZodError") {
      const messages = err.errors.map((e) => e.message);
      return res.status(400).json({ errors: messages });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};