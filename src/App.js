const express = require('express')
const config = require('./Config')
const app = express()
const morgan = require('morgan')
const error = require('./red/errors')

//importacion de modulos

const empleado = require('./modulo/empleado/rutas')
const usuario = require('./modulo/Usuarios/rutas')
const auth = require('./modulo/auth/rutas')

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Configuración de la app
app.set('port', config.app.port)


//Rutas de la api

app.use('/api/v1', empleado)
app.use('/api/v1', usuario)
app.use('/api/v1', auth)
app.use(error)


module.exports = app;