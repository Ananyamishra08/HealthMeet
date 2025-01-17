import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"));

        // Connecting to MongoDB
        await mongoose.connect(`${process.env.MONGODB_URI}/FULLSTACKPROJECT`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1); // Exit if connection fails
    }
};

export default connectDB;
