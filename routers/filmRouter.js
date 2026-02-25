//importiamo express
const express = require('express');

//utilizziamo express per router
const router = express.Router();

const imagePath = require("../middlewares/imagePath");


//importiamo relativo controller
const filmController = require('../controller/filmController');


//definiamo le rotte

//rotta index
router.get("/", imagePath, filmController.index);

//rotta show
router.get('/:id', imagePath, filmController.show)

//rotta create
router.post('/:id/reviews', filmController.storeReview)


module.exports = router