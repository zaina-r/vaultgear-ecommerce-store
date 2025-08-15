import mongoose from "mongoose"


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB CONNECTED SUCCESSFULLY")    
    } catch (e) {
        console.error(`ERROR CONNECTING MONGODB: ${e}`)
        process.exit(1) // 1- exit with failure
    }
}