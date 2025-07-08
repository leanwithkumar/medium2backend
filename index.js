import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import Databaseconnection from "./models/databseconn.js";
import bodyParser from "body-parser";
import signuproute from "./routes/signup.route.js";
import signinroute from "./routes/signin.route.js";
import signoutroute from "./routes/logout.route.js";
import cookieParser from "cookie-parser";
import addblogroute from "./routes/addblog.route.js";
import userdetailsroute from "./routes/userdetails.route.js";
import userblogs from "./routes/userblogs.route.js";
import readblog from "./routes/readblog.route.js";
import treandingblogs from "./routes/trendingblogs.route.js";
import searchblog from "./routes/searchblog.route.js";
import editrouter from "./routes/editblog.route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://medium2-eosin.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', signuproute);
app.use('/', signinroute);
app.use('/', signoutroute);
app.use('/', userdetailsroute);
app.use('/', addblogroute);
app.use('/', userblogs);
app.use('/', readblog);
app.use("/", treandingblogs);
app.use("/", searchblog);
app.use("/", editrouter);

app.get("/verify", (req, res) => {
  const token = req.cookies?.medium2token;

  if (!token) {
    return res.status(400).json({ message: "signin needed" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ message: "invalid or expired token" });
  }
});

Databaseconnection()
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.log("Failed to connect to DB:", err.message);
  });
