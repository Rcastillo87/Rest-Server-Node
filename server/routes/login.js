const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                err: { message: '(correo) no contraseña encontrado' }
            });
        }

        if (!bcrypt.compareSync(body.password, usuario.password)) {
            return res.status(400).json({
                ok: false,
                err: { message: 'correo no (contraseña) encontrado' }
            });
        }

        let token = jwt.sign({ usuario }, process.env.SEED, { expiresIn: 60 * 60 * 24 * 30 });

        res.json({
            ok: true,
            nombre: usuario,
            token
        });

    });

});

module.exports = app;