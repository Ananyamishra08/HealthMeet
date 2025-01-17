import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"));

        // Connecting to MongoDB
        await mongoose.connect(
           "mongodb+srv://ananya01mishra08:fullstackproject@cluster0.2sfk2.mongodb.net",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1); // Exit if connection fails
    }
};

export default connectDB;
