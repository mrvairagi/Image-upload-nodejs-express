var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const ImageController = require('../app/controllers/imageController')

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/uploadImage', ImageController.newImage);

module.exports = router;
