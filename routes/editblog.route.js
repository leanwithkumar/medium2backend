import express from "express";
import { deleteBlog, getSingleBlog, updateBlog } from "../controller/editblog.controller.js";

const editrouter = express.Router();

editrouter.get("/blog/:id", getSingleBlog);
editrouter.put("/updateblog/:id", updateBlog);
editrouter.delete("/deleteblog/:id", deleteBlog)

export default editrouter;
