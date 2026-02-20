const express = require('express');
const app = express();
const port = process.env.PORT;


//variabile middleware
const errorHandler = require("./middlewares/errorHandler")
const notFound = require("./middlewares/notFound")

// attivo public
app.use(express.static('public'));




// rotta home

app.get('/', (req, res) => {
    res.send("<h1>Rotta Home della webapp dei film</h1>")
})



app.use(errorHandler);
app.use(notFound);


app.listen(port, () => {
    console.log(`Esempio ${port}`)
})