import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import Databaseconnection from "./models/databseconn.js"
import bodyParser from "body-parser"
import signuproute from "./routes/signup.route.js"
import signinroute from "./routes/signin.route.js"
import signoutroute from "./routes/logout.route.js"
import verifyAuth from "./routes/verify.route.js"
import cookieParser from "cookie-parser"
dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/', signuproute)
app.use('/', signinroute)
app.use('/', signoutroute)
app.use('/', verifyAuth)



Databaseconnection()
.then(()=>{
    app.listen(port, ()=>console.log(`app is listening at port : ${port}`))
})
.catch((err)=>{
    console.log(err.message)
})



