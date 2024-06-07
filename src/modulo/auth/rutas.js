const respuestas = require('../../red/respuestas')
const express = require('express')
const router = express.Router()

const controlador = require('./index')

//---------------Rutas de las consultas-------------------//

router.get( '/login', login);

//--------------------------------------------------------------------------//

//----------------------Funciones de las rutas-------------------------------//

function login(req, res, next) {
    try {
        const token = controlador.login(req.body.user, req.body.pass);
        respuestas.succes(req, res, token, 200);
        
    } catch (error) {
        next(error)
    }
    
}

module.exports = router;