import express from "express"
import signup from "../controller/signup.controller.js"

const signuproute = express.Router()

signuproute.post('/signup', signup)
export default signuproute