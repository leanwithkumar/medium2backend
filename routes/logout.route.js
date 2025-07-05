import express from "express"
import { Signout } from "../controller/signout.controller.js"

const signoutroute = express.Router()

signoutroute.get('/logout', Signout);
export default signoutroute