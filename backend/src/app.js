import express from "express"
import router from "./routes/productRoutes.js"
import { connectDB } from "../config/db.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

connectDB()

app.use(express.json()) //middleware

app.use("/api", router)

app.listen(PORT, () => {
    console.log("Server started on port: ", PORT)
})


//1:20:59