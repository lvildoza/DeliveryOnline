import { Router } from 'express';
import userModel from '../models/user.models.js';
import { createHash, isValidPassword } from '../../utils.js';

const router = Router();

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, direction_name, direction_number, city_name, postalCode, mobile_number, password } = req.body;
    console.log("Registrando user");
    console.log(req.body);

    const exists = await userModel.findOne({ email })
    if(exists){
        return res.status(400).send({ status: 'error', message: 'usuario ya existe' })
    }
    const user = {
        first_name,
        last_name,
        email,
        age,
        direction_name,
        direction_number,
        city_name,
        postalCode,
        mobile_number,
        //password // Se encripta después
        password: createHash(password)
    }
    const result = await userModel.create(user);
    // res.status(201).send({ status: "success", message: "Usuario creado con exito con ID: " + result.id });
    res.send({ status: "200", message: "Usuario creado con exito con ID: " + result.id});
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }) // Ya que el password no está hasheado, podemos buscarlo directamente

    if (!user) return res.status(401).send({ status: "error", error: "Incorrect credentials" })

    // Validación con bcrypt
    if (!isValidPassword(user, password)){
        return res.status(401).send({ status: "error", error: "Incorrect credentials" });
    }


    // Alta la session del usaurio
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
});

export default router;