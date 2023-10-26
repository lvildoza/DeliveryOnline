// Dependencies
import mongoose from 'mongoose';
//import sessions from './sessionsMongo.js';
import dotenv from 'dotenv'; 
dotenv.config()

/*=======================================
=           connectMongoDB              =
=======================================*/
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Successfully connected to MongoDB using Mongoose.");
    } catch (error) {
        console.error("Could not connect to the database using Mongoose: " + error);
    }
};

//sessions();

// Export the module
export default dbConnect;