const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log("connection succesfull ")

    } catch (error) {
        console.log("error:", error)
        // process.exit()
    }
}

module.exports = connectDB;