// Dependencies
import mongoose from 'mongoose';

// Schema and collection constants
const collection = 'users';

// Create a schema
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    direction_name: String,
    direction_number: Number,
    city_name: String,
    postalCode: Number,
    mobile_number: Number,
    password: String //Leave it flat for the moment.
})

// I send the data to the schema and collection
const userModel = mongoose.model(collection, userSchema);

// Export the model
export default userModel;