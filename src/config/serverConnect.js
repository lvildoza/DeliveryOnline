// Dependencies
import dotenv from 'dotenv';
import app from './app.js';
dotenv.config()

/*===============================
=           Server              =
===============================*/
const localServer = async () => {
    try {    app.listen(process.env.PORT, () => {
        console.log("Server listening on port:" + process.env.PORT);
    });        
    } catch (error) {
        console.log(error.message)
    }
};

// Export the function
export default localServer;