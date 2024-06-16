const bd = require('../../BD/Postgresql');
const contr = require('./controlador');

module.exports = contr(bd);