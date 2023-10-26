// Dependencies
import dbConnect from './config/dbConnect.js';
import localServer from './config/serverConnect.js';


// Call each module
localServer();
dbConnect();