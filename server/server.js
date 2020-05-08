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

require('./config/config');
const express = require('express');
const app = express();

app.use(require('./routes/index'));

app.listen(process.env.NODE_ENV, () => {
    console.log('Escuchando puerto: ', process.env.NODE_ENV);
});