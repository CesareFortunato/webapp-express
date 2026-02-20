//importiamo express
const express = require('express');

//utilizziamo express per router
const router = express.Router();


//importiamo relativo controller
const filmController = require('../controller/filmController');


//definiamo le rotte

//rotta index
router.get('/', filmController.index)

//rotta show
router.get('/:id', filmController.index)


module.exports = router