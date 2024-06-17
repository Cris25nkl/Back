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
                switch (tabla) {
                    case 'empleado':
                        client.query(`SELECT * FROM ${tabla} WHERE id = '${id}'`)
                    .then((res) => {
                        client.end();
                        resolve(res.rows);
                    })
                    .catch((err) => {
                        client.end();
                        reject(err);
                    });
                        
                        break;
                    
                    case 'inventario':
                        client.query(`SELECT nombreproducto, preciounitario FROM ${tabla} WHERE id = '${id}'`)
                    .then((res) => {
                        client.end();
                        resolve(res.rows);
                    })
                    .catch((err) => {
                        client.end();
                        reject(err);
                    });

                        break;

                    case 'proveedor':
                        client.query(`SELECT * FROM ${tabla} WHERE id = '${id}'`)
                    .then((res) => {client.end();
                        resolve(res.rows);
                    })  
                    .catch((err) => {client.end();
                        reject(err);
                    });
                        
                            break;
                
                    default:
                        break;
                }
                
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

                            case 'inventario':
                                if (res.rows.length > 0) {
                                    resolve(update(tabla, data));
                                } else {
                                    resolve(agrego(tabla, data));
                                }
                                break;
                            
                            case 'venta':
                                if (res.rows.length > 0) {
                                    resolve(update(tabla, data));
                                } else {
                                    resolve(agrego(tabla, data));
                                }

                                break;

                            case 'proveedor':
                                if (res.rows.length > 0) {
                                    resolve(update(tabla, data));
                                } else {
                                    resolve(agrego(tabla, data));
                                }

                                break;
                        
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

//----------------FUNCIONES AUXILIARES PARA EL OTROS MODULOS------------------//
function update(tabla, data) {
    return new Promise((resolve, reject) => {
        const client = new postgresql.Client(dbconfig);
        client.connect()
            .then(() => {
                switch (tabla) {
                    case 'empleado':
                        client.query(`UPDATE ${tabla} SET nombre = $1, apellido = $2, telefono = $3, cargo = $4 WHERE id = $5`, [data.nombre, data.apellido, data.telefono, data.cargo, data.id])
                    .then((res) => {
                        client.end();
                        resolve(res.rows);
                    })
                    .catch((err) => {
                        client.end();
                        reject(err);
                    });
                        
                        break;
                    case 'inventario':
                        client.query(`UPDATE ${tabla} SET nombreproducto = $1, preciounitario = $2, idproveedor = $3 WHERE id = $4`, [data.nombreproducto, data.preciounitario, data.idproveedor, data.id])
                    .then((res) => {
                        client.end();
                        resolve(res.rows);
                    })
                    .catch((err) => {
                        client.end();
                        reject(err);
                    });
                    break;

                    case 'venta':
                        client.query(`UPDATE ${tabla} SET nombreempleado = $1, productovendido = $2, cantivendida = $3, totalventa = $4
                             WHERE id = $5`, [data.nombreempleado, data.productovendido, data.cantivendida, data.totalventa, data.id])
                    .then((res) => {client.end();
                        resolve(res.rows);
                    }).catch((err) => {client.end();
                        reject(err);
                    });

                    break;

                    case 'proveedor':
                        client.query(`UPDATE ${tabla} SET numerotelefono = $1, direccion = $2 WHERE id = $3`, [data.numerotelefono, data.direccion, data.id])
                    .then((res) => {client.end();
                        resolve(res.rows);
                    }).catch((err) => {client.end();
                        reject(err);
                    });

                    break;
                
                    default:
                        break;
                }
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
                switch (tabla) {
                    case 'empleado':
                        client.query(`INSERT INTO ${tabla} (id, nombre, apellido, telefono, cargo) VALUES ($1, $2, $3, $4, $5)`, [data.id, data.nombre, data.apellido, data.telefono, data.cargo])
                    .then((res) => {
                        client.end();
                        resolve(res.rows);
                    })
                    .catch((err) => {
                        client.end();
                        reject(err);
                    });

                    break;

                    case 'inventario':
                        client.query(`INSERT INTO ${tabla} (id, nombreproducto, preciounitario,idproveedor) VALUES ($1, $2, $3, $4)`, [data.id, data.nombreproducto, data.preciounitario, data.idproveedor])
                        .then((res) => {
                        client.end();
                        resolve(res.rows);
                    })
                    .catch((err) => {
                        client.end();
                        reject(err);
                    });  
                        break;

                    case 'venta':
                        client.query(`INSERT INTO ${tabla} (id, nombreempleado, productovendido, cantivendida, totalventa) VALUES ($1, $2, $3, $4, $5)`, [data.id, data.nombreempleado, data.productovendido, data.cantivendida, data.totalventa])
                        .then((res) => {
                        client.end();
                        resolve(res.rows);
                    })
                    .catch((err) => {
                        client.end();
                        reject(err);
                    });  
                        break;

                    case 'proveedor':
                        client.query(`INSERT INTO ${tabla} (id, numerotelefono, direccion) VALUES ($1, $2, $3)`, [data.id, data.numerotelefono, data.direccion])
                        .then((res) => {
                        client.end();
                        resolve(res.rows);
                    })
                
                    default:
                        break;
                }
            })
            .catch((err) => {
                client.end();
                reject(err);
            });
    });
    
}

//----------------------------------------------------------------//

//---------------FUNCIONES AUXILIARES PARA USUARIO----------------//



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


function user(tabla, id) {
    return new Promise((resolve, reject) => {
        const client = new postgresql.Client(dbconfig);
        client.connect()
            .then(() => {
                client.query(`SELECT id, cargo FROM ${tabla} WHERE id = $1`, [id])
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