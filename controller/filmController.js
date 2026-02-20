// importo la connessione del DB
const connection = require('../data/db');


//funzione index

function index(req, res) {
    console.log("hai richiesto index");

}



//funzione show

function show(req, res) {
    console.log("hai richiesto un film con id specifico");

}


module.exports = { index, show }