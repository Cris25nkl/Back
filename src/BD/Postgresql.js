const postgresql = require('pg')
const config = require('../Config');
const bcrypt = require('bcrypt');





//---------------PARAMETROS PARA LA CONEXION----------------------//

const dbconfig = {
    user: config.postgresql.user,
    host: config.postgresql.host,
    database: config.postgresql.database,
    password: config.postgresql.password,
    port: config.postgresql.port
}
function connect() {
    const client = new postgresql.Client(dbconfig);
    client.connect()
        .then(() => {
            console.log('Conexión exitosa');
        })
        .catch((err) => {
            console.error('Error de conexión', err);
        })
        .finally(() => {
            client.end();
        });
}

connect();



//----------------------------------------------------------------//

            //---------_/\_-----------------_/\_-------------//
            //---------|  |-----------------|--|------------//
            //---------|  |-----------------|--|-----------//
            //---------T--T-----------------T--T----------//

//---------------FUNCIONES PARA LA BASE DE DATOS------------------//


function getAll(tabla) {
    //return connect();
    return new Promise((resolve, reject) => {
        const client = new postgresql.Client(dbconfig);
        client.connect()
            .then(() => {
                client.query(`SELECT * FROM ${tabla}`)
                    .then((res) => {
                        client.end();
                        resolve(res.rows);
                    })
                    .catch((err) => {
                        client.end();
                        reject(err);
                    });
            })
            .catch((err) => {
                client.end();
                reject(err);
            });
    });
}

function getById(tabla, id) {
    //return connect();
    return new Promise((resolve, reject) => {
        const client = new postgresql.Client(dbconfig);
        client.connect()
            .then(() => {
                client.query(`SELECT * FROM ${tabla} WHERE id = '${id}'`)
                    .then((res) => {
                        client.end();
                        resolve(res.rows);
                    })
                    .catch((err) => {
                        client.end();
                        reject(err);
                    });
            })
            .catch((err) => {
                client.end();
                reject(err);
            });
    });
}

function insert(tabla, data) {
    return new Promise((resolve, reject) => {
        const client = new postgresql.Client(dbconfig);
        client.connect()
            .then(() => {
                client.query(`SELECT * FROM ${tabla} WHERE id = $1` , [data.id] )
                    .then((res) => {
                        client.end();
                        switch (tabla) {
                            case 'empleado':
                                if (res.rows.length > 0) {
                                    resolve(update(tabla, data));
                                } else {
                                    resolve(agrego(tabla, data));
                                }
                                break;
                            
                            case 'usuario':
                                if (res.rows.length > 0) {
                                    resolve(updateUser(tabla, data));
                                } else {
                                    resolve(agregoUser(tabla, data));
                                }
                        
                            default:
                                break;
                        }
                        
                    })
                    .catch((err) => {
                        client.end();
                        reject(err);
                    });
            })
            .catch((err) => {
                client.end();
                reject(err);
            });
    });
    
}

//---------------FUNCIONES AUXILIARES PARA INSERT------------------//

//----------------FUNCIONES AUXILIARES PARA EL MODULO EMPLEADO------------------//
function update(tabla, data) {
    return new Promise((resolve, reject) => {
        const client = new postgresql.Client(dbconfig);
        client.connect()
            .then(() => {
                client.query(`UPDATE ${tabla} SET nombre = $1, apellido = $2, telefono = $3, cargo = $4 WHERE id = $5`, [data.nombre, data.apellido, data.telefono, data.cargo, data.id])
                    .then((res) => {
                        client.end();
                        resolve(res.rows);
                    })
                    .catch((err) => {
                        client.end();
                        reject(err);
                    });
            })
            .catch((err) => {
                client.end();
                reject(err);
            });
    });
    
}

function agrego(tabla, data) {
    return new Promise((resolve, reject) => {
        const client = new postgresql.Client(dbconfig);
        client.connect()
            .then(() => {
                client.query(`INSERT INTO ${tabla} (id, nombre, apellido, telefono, cargo) VALUES ($1, $2, $3, $4, $5)`, [data.id, data.nombre, data.apellido, data.telefono, data.cargo])
                    .then((res) => {
                        client.end();
                        resolve(res.rows);
                    })
                    .catch((err) => {
                        client.end();
                        reject(err);
                    });
            })
            .catch((err) => {
                client.end();
                reject(err);
            });
    });
    
}

//----------------------------------------------------------------//

//---------------FUNCIONES AUXILIARES PARA USUARIO----------------//

function updateUser(tabla, data) {
    return new Promise(async (resolve, reject) =>  {
        const client = new postgresql.Client(dbconfig);
        const cedula = await bcrypt.hash(data.cedula.toString(), 5);
        client.connect()
            .then(() => {
                client.query(`UPDATE ${tabla} SET username = $1, email = $2, cedula = $3 WHERE id = $4`, [data.username, data.email, cedula, data.id])
                    .then((res) => {
                        client.end();
                        resolve(res.rows);
                    })
                    .catch((err) => {
                        client.end();
                        reject(err);
                    });
            })
            .catch((err) => {
                client.end();
                reject(err);
            });
    });

}

function agregoUser(tabla, data) {
    return new Promise(async (resolve, reject) => {
        const client = new postgresql.Client(dbconfig);
        const cedula = await bcrypt.hash(data.cedula.toString(), 5);//Para encriptar la cedula y usarla como contraseña
        const generateToken =  (user) => {
            return config.jwt.sign({id: user.id, username: user.username, email: user.email}, 'secret');
        }

        client.connect()
            .then(() => {
                    client.query(`INSERT INTO ${tabla} (id, username,email, cedula) VALUES ($1, $2, $3, $4)`, [data.id,data.username, data.email, cedula])
                    .then((res) => {
                        client.end();
                        resolve(res.rows);
                    })
                    .catch((err) => {
                        client.end();
                        reject(err);
                    });

                   
            })
            .catch((err) => {
                client.end();
                reject(err);
            });

        
    });

}

//----------------------------------------------------------------//

function deleted(tabla, data) {    
    return new Promise((resolve, reject) => {
        const client = new postgresql.Client(dbconfig);
        client.connect()
            .then(() => {
                client.query(`DELETE FROM ${tabla} WHERE id = $1`, [data.id])
                    .then((res) => {
                        client.end();
                        resolve(res.rows);
                    })
                    .catch((err) => {
                        client.end();
                        reject(err);
                    });
                
                
            })
            .catch((err) => {
                client.end();
                reject(err);
            });
    });
}


function user(tabla, data) {
    return new Promise((resolve, reject) => {
        const client = new postgresql.Client(dbconfig);
        client.connect()
            .then(() => {
                client.query(`SELECT username, cedula FROM ${tabla} WHERE username = $1`, [data])
                    .then((res) => {
                        client.end();
                        resolve(res.rows);
                    })
                    .catch((err) => {
                        client.end();
                        reject(err);
                    });
            })
            .catch((err) => {
                client.end();
                reject(err);
            });
    });
}   



//----------------------------------------------------------------//


module.exports = { 
    getAll,
    getById,
    insert,
    deleted,
    user
    
};