

const tabla1 = 'empleado';

const auth = require('../../autenticacion');




module.exports  = function (bdInyect){

    let db = bdInyect;
    if(!db){
        db = require('../../BD/Postgresql');
    }


    function login(id) {
        return db.user(tabla1, id)
    }   
    

   return{ 
       
        login}
};