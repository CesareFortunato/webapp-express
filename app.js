require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const filmRouter = require('./routers/filmRouter');


//variabile middleware
const errorHandler = require("./middlewares/errorHandler")
const notFound = require("./middlewares/notFound")

// attivo public
app.use(express.static('public'));

// rotta home

app.get('/api', (req, res) => {
    res.send("<h1>Rotta Home della webapp dei film</h1>")
})

//monto il router

app.use('/api/films', filmRouter)






app.use(notFound);
app.use(errorHandler);



app.listen(port, () => {
    console.log(`Server attivo su http://localhost:${port}`)
})