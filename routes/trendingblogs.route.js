import express from "express"
import { trendingblog } from "../controller/trendingblog.controller.js"

const treandingblogs = express.Router()

treandingblogs.get('/trendingvlogs', trendingblog)
export default treandingblogs