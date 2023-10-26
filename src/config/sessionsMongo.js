import app from './app.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config()

/*===========================================
=               session                     =
===========================================*/

const sessions = () => {
    app.use(session({
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URL,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
            ttl: 10 * 60
        }),
    
        secret: process.env.PASSSECRET,
        resave: false, //guarda en memoria
        saveUninitialized: true, //lo guarda a penas se crea
    }));
}

// Esporto el modulo
export default sessions;