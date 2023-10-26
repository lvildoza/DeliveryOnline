import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
    // Falta implementación
    res.render('login')
});

router.get("/register", (req, res) => {
    // Falta implementación
    res.render('register')
});

// Cuando ya tenemos una session activa con los datos del user, renderizamos la vista profile
router.get("/", (req, res) => {
    // Falta implementar
    res.render('profile', {
        user: req.session.user
    })
});


export default router;