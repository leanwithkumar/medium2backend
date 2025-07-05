import express from "express"
import { verifytoken } from "../controller/verify.controller.js"

const verifyAuth =  express.Router()

verifyAuth.get('/verify', verifytoken)

export default verifyAuth