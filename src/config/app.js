// Dependencies
import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from '../../utils.js';

//import Routers
import viewsRouter from '../routes/views.router.js';
import usersViewRouter from '../routes/users.views.router.js';
import sessionsRouter from '../routes/sessions.router.js';

// Constant app
const app = express();

// JSON Settings:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebar configurations
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/src/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/src/public'));

/*==============================
=           Routes             =
==============================*/
app.use("/", viewsRouter);
app.use("/users", usersViewRouter);
app.use("/api/sessions", sessionsRouter);

// Export the function
export default app;