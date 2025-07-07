import express from "express"
import { readvlogs } from "../controller/readblog.controller.js"

const readblog = express.Router()

readblog.get('/readblog/:blogId', readvlogs)
export default readblog