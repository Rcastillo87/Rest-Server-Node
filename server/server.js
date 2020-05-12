/////////////////////////////// coneccion a mongo //////////////////////////////////////////
require('./config/config');
const mongoose = require('mongoose');
const config = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
//se establece coneccion a la bd mongo
mongoose.connect(process.env.URLDB, config);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
    console.log('connected'); // si esta todo ok, imprime esto
});
////////////////////////////////////////////////////////////////////////////
const path = require('path');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// configuramos la app para que use bodyParser(), esto nos dejara usar la informacion de los POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./routes/index'));
app.use(express.static(path.resolve(__dirname, '../public')))

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});