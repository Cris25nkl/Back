

const tabla1 = 'usuario';
const bcrypt = require('bcrypt');

const auth = require('../../autenticacion');




module.exports  = function (bdInyect){

    let db = bdInyect;
    if(!db){
        db = require('../../BD/Postgresql');
    }


    async function login(user, pass) {
        const data = await db.query(tabla1, {usuario: user});

        return bcrypt.compare(pass, data.cedula).then((respuesta) => {
            if (respuesta === true) {
                //token
                return auth.tokens(data.cedula);
        }else{
            throw new Error('Usuario o contraseña incorrectos');
        }
    });
    }   
    
    
  /*  async function added(data) {
        const auth = {
            id : data.id
        }

        if (data.username) {
            auth.username = data.username;
        }

        if (data.cedula) {
            auth.cedula = await bcrypt.hash(data.cedula.toString(), 5);
        }
        return db.insert(tabla1, auth);
    }*/


   return{ 
       
        login}
};