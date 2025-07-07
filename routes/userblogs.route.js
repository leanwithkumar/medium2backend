import express from "express"
import { alluserblogs } from "../controller/userblogs.controller.js"

const userblogs = express.Router()
userblogs.get('/usersblogs/:userId', alluserblogs )
export default userblogs