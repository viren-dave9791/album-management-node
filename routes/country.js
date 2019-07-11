var express = require('express');
var Country = require('../models').Country;
var models = require('../models');
var sequelize = require('../sequelize')();
const fileUpload = require('express-fileupload');


var router = express.Router();
router.get('/', function(req, res){
    Country.findAll({include:[]}).then(countries => {
        res.json(countries);
    },function(err){
		console.log(err);
	}
	);
});

router.get('/:id', function(req, res){
    console.log('getting one user');   
    // another ways to do it
    Country.findOne({ where: {id: req.params.id}, include:[] }).then(country => {
        console.log(country);
        res.json(country);
    }).error(err => {
        res.send('error has occured');
    });
    
});

module.exports = router;