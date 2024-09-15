import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";


dotenv.config()

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// Importing Routes
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/posts.route.js"

// Declaring User Routes
app.use('/api/v1/users', userRouter)

// Post Routes
app.use('/api/v1/posts', postRouter)

app.use((err, req, res, next) => {
  // console.error(err.stack); 
  res.status(err.statusCode || 500).json({ error: err.message })
});


// -----------------------------deployment------------------------------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
  })
} else {
  app.get('/', (req, res) => {
    res.send("API is running :)")
  })
}

// -----------------------------deployment------------------------------------

export { app }