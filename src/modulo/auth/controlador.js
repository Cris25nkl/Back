

const tabla1 = 'usuario';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const auth = require('../../autenticacion');




module.exports  = function (bdInyect){

    let db = bdInyect;
    if(!db){
        db = require('../../BD/Postgresql');
    }


    async function login(data,res) {

       const {username, cedula } = data.body;

        const user = await db.user(tabla1, username);
        console.log(user)
        if (!user) {
            return res.json({error: 'Usuario incorrecto', status: 400});
        }

        if (username !== user[0].username) {
            
            return res.json({error: 'Username incorrecto', status: 400});
        }


        const cedulaCorrecta = await bcrypt.compare(cedula, user[0].cedula);
        if (!cedulaCorrecta) {
            return res.json({error: 'cedula incorrecta', status: 400});
        }

        const token = jwt.sign({id: user[0].id, username: user[0].username},'123' );
     

      return res.json({token: token, status: 200});
     
        
    }   
    



   return{ 
       
        login}
};