// Dependencias
import { Router } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config()

const router = Router();

/*=======================================
=           Session Management          =
=======================================*/
router.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
        res.send(`Se ha visitado este sitio ${req.session.counter} veces. `);
    } else {
        req.session.counter = 1;
        res.send("Bienvenido!");
    }
});

// Login
router.get('/login', (req, res) => {
    const {username, password} = req.query;
    if (username !== process.env.ADMINUSER || password !== process.env.ADMINPASS) {
        return res.status(401).send("Login Failed, check your username and password.");
    } else {
        req.session.user = username;
        req.session.admin = true;
        res.send("Login Successful!");
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.json({error: "error logout", msg: "Error al cerrar la sesión"});
        }
        res.send("Sesion cerrada correctamente!!")
    })
});

/*=======================================
=           Middleware                  =
=======================================*/
// Auth middleware:
function auth(req, res, next) {

    if(req.session.user === process.env.ADMINUSER && req.session.admin){
        return next()
    }else{
        return res.status(403).send('Usuario no autorizado para ingresar a este recurso..')
    }
};

// Con firma
router.use(cookieParser(process.env.PASSSECRET))

router.get('/', (req, res) => {
    res.render('index', {})
});

// Privada
router.get('/private', auth, (req, res) => {
    res.send("Si estas viendo esto, es porque pasaste la autorización y sos un ADMIN!!!")

});

/*=======================================
=           Cookies                     =
=======================================*/
// setCookie
router.get('/setCookie', (req, res) => {
    
    // Con firma
    res.cookie("TeclabCookie", "Esta es una cookie de VPP Teclab", {
    maxAge: 30000, signed: true }).send("Cookie asignada con exito!!!")
})

// getCookies
router.get('/getCookies', (req, res) => {
    res.send(req.signedCookies)
})

// deleteCookie
router.get('/deleteCookie', (req, res) => {
    res.clearCookie("CoderCookie").send("cookie borrada!!")
})

export default router;