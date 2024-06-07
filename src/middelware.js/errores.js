function error(mensaje, code) {
   let a = new Error(mensaje); 
   if (code) {
    a.statusCode = code;
    
   }

   return a;
    }
    
module.exports = error;