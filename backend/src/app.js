import express from "express"
import router from "./routes/productRoutes.js"
import { connectDB } from "../config/db.js"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001


app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json()) //middleware

app.use("/api", router)


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port: ", PORT)
    })
})
