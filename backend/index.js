import { app } from "./app.js"
import connectDB from "./database/index.js";

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running at PORT : ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log("mongodb connection failed", error)
    })