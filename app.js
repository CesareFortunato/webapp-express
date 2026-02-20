const express = require('express');
const app = express();
const port = process.env.PORT;

//importo router
const postsRouter = require ('./routers/posts');

//importo i posts
const posts = require('./data/postsData');

//variabile middleware
const errorHandler = require("./middlewares/errorHandler")
const notFound = require("./middlewares/notFound")

app.use(express.static('public'));

// body-parser
app.use(express.json());

app.use("/posts", postsRouter)


app.get('/', (req, res) => {
    res.json(posts)
    
})

app.use("/posts", errorHandler);
app.use(notFound);


app.listen(port, () => {
    console.log(`Esempio ${port}`)
})