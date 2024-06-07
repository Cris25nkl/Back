

const tabla1 = 'usuario';




module.exports  = function (bdInyect){

    let db = bdInyect;
    if(!db){
        db = require('../../BD/Postgresql');
    }
    function getAll() {
        return db.getAll(tabla1);
    }
    
    function getOne(id) {
        return db.getById(tabla1, id);
    }
    
    function del(body) {
        return db.deleted(tabla1, body);
    }
    
    function added(body) {
        return db.insert(tabla1, body);
    }


   return{ 
        getAll,
        getOne,
        del,
        added}
};