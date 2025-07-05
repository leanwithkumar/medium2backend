import express from "express";
import { Signin } from "../controller/signin.controller.js";

const signinroute = express.Router();

signinroute.post('/signin',Signin)
export default signinroute