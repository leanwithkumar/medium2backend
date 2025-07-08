import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import Databaseconnection from "./models/databseconn.js";

import signuproute from "./routes/signup.route.js";
import signinroute from "./routes/signin.route.js";
import signoutroute from "./routes/logout.route.js";
import userdetailsroute from "./routes/userdetails.route.js";
import addblogroute from "./routes/addblog.route.js";
import userblogs from "./routes/userblogs.route.js";
import readblog from "./routes/readblog.route.js";
import treandingblogs from "./routes/trendingblogs.route.js";
import searchblog from "./routes/searchblog.route.js";
import editrouter from "./routes/editblog.route.js";

const app = express();
const port = process.env.PORT || 5000;

// ✅ Recommended CORS configuration for Render + Vercel
const corsOptions = {
  origin: ["http://localhost:5173", "https://medium2-eosin.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
// ✅ Allow preflight requests to be handled correctly
app.options("*", cors(corsOptions));

app.use(bodyParser.json());
app.use(cookieParser());

// ✅ API routes
app.use("/", signuproute);
app.use("/", signinroute);
app.use("/", signoutroute);
app.use("/", userdetailsroute);
app.use("/", addblogroute);
app.use("/", userblogs);
app.use("/", readblog);
app.use("/", treandingblogs);
app.use("/", searchblog);
app.use("/", editrouter);

// ✅ Optional health check
app.get("/ping", (req, res) => {
  res.json({ message: "pong", origin: req.headers.origin });
});

// ✅ Token verification endpoint
app.get("/verify", (req, res) => {
  const token = req.cookies?.medium2token;

  if (!token) {
    return res.status(400).json({ message: "signin needed" });
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ message: "invalid or expired token" });
  }
});

// ✅ Start server after DB connects
Databaseconnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("❌ Database connection failed:", err.message);
  });
