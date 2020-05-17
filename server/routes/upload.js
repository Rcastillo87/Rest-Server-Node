const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
app.use(fileUpload());
const fs = require('fs');
const path = require('path');


app.put('/upload/:tipo/:id', (req, res) => {

    let tipo = req.params.tipo;
    let id = req.params.id;
    let tiposValidas = ['usuarios', 'productos'];

    if (tiposValidas.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: { message: 'tipos validao: ' + tiposValidas.join(', ') }
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: { message: 'archivo no pudo ser cargado' }
        });
    }

    let archivo = req.files.archivo;
    let nombrecortado = archivo.name.split('.');
    let extencion = nombrecortado[nombrecortado.length - 1];
    let extencionesValidas = ['jpg', 'png', 'jpeg'];

    if (extencionesValidas.indexOf(extencion) < 0) {
        return res.status(400).json({
            ok: false,
            err: { message: 'extensiones validas: ' + extencionesValidas.join(', ') },
            ext: extencion
        });
    }

    let nombre = `${ id }-${ new Date().getMilliseconds() }.${ extencion }`;

    archivo.mv(`uploads/${ tipo }/${ nombre }`, function(err) {
        if (err)
            return res.status(500).send(err);

        if (tipo === 'usuarios') {
            ImgenUsuario(id, res, nombre);
        } else {
            ImgenProducto(id, res, nombre);
        }
    });
});

function ImgenUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (err, usuarioBD) => {
        if (err) {
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioBD) {
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(400).json({
                ok: false,
                err: { message: 'archivo no existe' }
            });
        }

        borraArchivo(usuarioBD.img, 'usuarios')

        usuarioBD.img = nombreArchivo;
        usuarioBD.save((err, usuarioGuardado) => {
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo

            })
        });

    })
}

function ImgenProducto(id, res, nombreArchivo) {
    Producto.findById(id, (err, productoBD) => {
        if (err) {
            borraArchivo(nombreArchivo, 'productos');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoBD) {
            borraArchivo(nombreArchivo, 'productos');
            return res.status(400).json({
                ok: false,
                err: { message: 'archivo no existe' }
            });
        }

        borraArchivo(productoBD.img, 'productos')

        productoBD.img = nombreArchivo;
        productoBD.save((err, productoGuardado) => {
            res.json({
                ok: true,
                productos: productoGuardado,
                img: nombreArchivo

            })
        });

    })
}

function borraArchivo(nombreImagen, tipo) {
    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ nombreImagen }`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}
module.exports = app;