
const express = require('express')
const router = express.Router()

const db = require('../../BD/Postgresql')
const jwt = require('jsonwebtoken')

const controlador = require('./index')

//---------------Rutas de las consultas-------------------//

router.post('/login',login);

//--------------------------------------------------------------------------//

//----------------------Funciones de las rutas-------------------------------//

async function login(req, res) {
    //console.log(req.body)

    const {cargo, id } = req.body;
    //console.log(cargo, id)

        const user = await controlador.login(id);

        //console.log(user)

        
        
        if (user.length === 0) {
            return res.json({error: 'Usuario no encontrado', status: 400});
        }

        if (cargo !== user[0].cargo) {
            
            return res.json({error: 'Username incorrecto', status: 400});
        }


       // const pass = parseInt(user[0].id);
       const pass = user[0].id

       // console.log(typeof pass, typeof id)
        
       
        if (pass !== id) {
            return res.json({error: 'contraseña incorrecta', status: 400});
        }

        const token = jwt.sign(user[0],'123' );
        res.cookie('token', token, {httpOnly: false})

        console.log(token)
     

       
      res.status(200).json({messge:"Login exitoso", token})
        

   
    
}

module.exports = router;