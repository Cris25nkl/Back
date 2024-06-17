const respuestas = require('../../red/respuestas')
const express = require('express')
const router = express.Router()

const controlador = require('./index')

//---------------Rutas de las consultas-------------------//

router.get('/inventario', all);
router.get('/inventario/:id', unique);
router.put('/inventario', deleted);
router.post('/inventario', agregar);


//--------------------------------------------------------------------------//

//----------------------Funciones de las rutas-------------------------------//

async function all(req, res, next) {
    try {
        const item = await controlador.getAll();
        res.json(item);
        
    } catch (error) {
        next(error)
    }
    
}

//--------------------------------------------------------------------------//
async function unique (req, res, next){
    try {
        const item = await controlador.getOne(req.params.id);
        res.status(200).json(item);
    } catch (error) {
        next(error)
        
    }
    
}

//--------------------------------------------------------------------------//

async function deleted(req, res, next){
    try {
        const item = await controlador.del(req.body);
        respuestas.succes(req, res, "Item eliminado", 200);
    } catch (error) {
        next(error)
    }
    
}

//--------------------------------------------------------------------------//

async function agregar(req, res, next){
    try {
        const item = await controlador.added(req.body);
        if (req.body.id) {
            mensaje = "Item insertado"; 
        }else{
            mensaje = "Item actualizado";
        }

        respuestas.succes(req, res, mensaje, 201);
    } catch (error) {
        next(error)
    }
}


module.exports = router;