//import dependencias
import express from "express";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";

//import DB
import MongoSingleton from "./config/db.js";

//import router
import productRoutes from "./routes/Mongo/productRoutes.js";
import cartRoutes from "./routes/Mongo/cartRoutes.js";
import usersViewRouter from "./routes/Users/users.views.router.js";
import userRouter from "./routes/Users/users.router.js";
import views from "./routes/Mongo/view.routes.js";

//import managers
import configEnv from "./config/env.config.js";
import "./config/db.js";

//PARA SESSION
import session from "express-session";
import MongoStore from "connect-mongo";

//import for passport
import passport from "passport";
import initializePassport from "./config/passport.config.js";

const app = express();

//Cookies
app.use(cookieParser("AppS3cr3tC0d3"));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware para archivos estaticos
app.use(express.static(__dirname + "/public"));

//middeleware para passport
initializePassport();
app.use(passport.initialize());

//Config Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//SESSION
app.use(
  session({
    mongoUrl: configEnv.mongoUrl,
    ttl: 60,
    secret: "AppS3cr3t",
    resave: true, //guarda en memoria
    saveUninitialized: false,
    //lo guarda apenas se crea
  })
);

//ROUTERS
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/products", views);
app.use("/carts", views);
app.use("/users", usersViewRouter);
app.use("/api/users", userRouter);

const PORT = configEnv.port;
const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mongoInstance = async () => {
  try {
    await MongoSingleton.getInstance();
  } catch (error) {
    console.log(error);
  }
};
mongoInstance();


app.get("/", async (req, res) => {
  let allProducts = await productManager.getProducts();
  const products = JSON.parse(allProducts);
  console.log(allProducts);
  res.render("home", {
    title: "Express con Handlebars",
    products,
  });
});


export const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  const data = await productManager.getProducts();
  console.log(data);
  const dataProd = JSON.parse(data);
  socket.emit("all-products", { dataProd });
});