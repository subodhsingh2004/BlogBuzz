import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`mongodb connected`)
        // console.log(connectionInstance)
    } catch (error) {
        console.log("error in connecting to database", error.message)
        process.exit(1);
    }
}

export default connectDB;