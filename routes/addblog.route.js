import express from "express"
import { addblog } from "../controller/addblog.controller.js";

const addblogroute = express.Router();

addblogroute.post('/addblog', addblog)

export default addblogroute