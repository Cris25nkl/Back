const respuesta = require('./respuestas');

function error(err, req, res, next) {
    console.error('[error]:', err);
    const mensaje = err.message || 'Internal error';
    const status = err.statusCode || 500;

    respuesta.error(req, res, mensaje, status);
    
}

module.exports = error;