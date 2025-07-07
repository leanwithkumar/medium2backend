import express from "express";
import { userdetails } from "../controller/userdetails.controller.js";

const userdetailsroute = express.Router()

userdetailsroute.get('/getuserdetails', userdetails)
export default userdetailsroute