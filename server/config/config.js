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

/*if (process.env.NODE_ENV === 'dev') {
    process.env.URLDB = 'mongodb://localhost:27017/cafe';
} else {
    process.env.URLDB = process.env.URLBD;
}*/
process.env.URLDB = 'mongodb+srv://admin:admin1234@cluster0-y8drr.mongodb.net/test?retryWrites=true&w=majority';
// ============================
//  semilla token
// ============================
process.env.SEED = 'entorno-desarrollo'; //process.env.SEED || 'entorno-pruebas';
// ============================
// caducidad del token
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
// ============================
process.env.TIMETOKEN = 60 * 60 * 24 * 30;