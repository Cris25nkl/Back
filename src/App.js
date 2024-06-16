const express = require('express')
const config = require('./Config')
const app = express()
const morgan = require('morgan')
const error = require('./red/errors')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


//Configuracon de los cors

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

//importacion de modulos

const empleado = require('./modulo/empleado/rutas')
const usuario = require('./modulo/Usuarios/rutas')
const auth = require('./modulo/auth/rutas')
const inventario = require('./modulo/producto/rutas')

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

//Configuración de la app
app.set('port', config.app.port)


//Rutas de la api

app.use('/api/v1', empleado)
app.use('/api/v1', usuario)
app.use('/api/v1', auth)
app.use('/api/v1', inventario)
app.use(error)


module.exports = app;