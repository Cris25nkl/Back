const respuestas = require('../../red/respuestas')
const express = require('express')
const router = express.Router()

const controlador = require('./index')

//---------------Rutas de las consultas-------------------//

router.post('/login',login);

//--------------------------------------------------------------------------//

//----------------------Funciones de las rutas-------------------------------//

async function login(req, res) {

    const item = await controlador.login(req, res);
   
    
}

module.exports = router;