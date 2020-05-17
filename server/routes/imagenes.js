const express = require('express');
let app = express();
const fs = require('fs');
const path = require('path');
const { verificarTokenImg } = require('../middlewares/autenticacion');


app.get('/imagen/:tipo/:img', verificarTokenImg, (req, res) => {
    let tipo = req.params.tipo;
    let img = req.params.img;
    let noImgPath = path.resolve(__dirname, `../assets/no-image.jpg`);
    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ img }`);
    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        res.sendFile(noImgPath);
    }
});





module.exports = app;