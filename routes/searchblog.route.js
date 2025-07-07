import express from "express";
import { searchBlogs } from "../controller/searchblog.controller.js";

const searchblog = express.Router();

searchblog.get("/searchblogs", searchBlogs);

export default searchblog;
