// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;
// ============================
//  entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// ============================
//  base de datos
// ============================
let urlBD;
if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = process.env.URLBD;
}
process.env.URLDB = urlBD;
// ============================
//  semilla token
// ============================
process.env.SEED = process.env.SEED || 'entorno-pruebas'
    // ============================
    // caducidad del token
    // 60 segundos
    // 60 minutos
    // 24 horas
    // 30 dias
    // ============================
process.env.TIMETOKEN = 60 * 60 * 24 * 30;