var express = require('express');
var State = require('../models').State;
var models = require('../models');
var sequelize = require('../sequelize')();
const fileUpload = require('express-fileupload');


var router = express.Router();
router.get('/', function(req, res){
    State.findAll({include:[{model: models.Country, as: 'countries'}]}).then(states => {
        res.json(states);
    },function(err){
		console.log(err);
	}
	);
});

router.get('/:id', function(req, res){
    console.log('getting one user');   
    // another ways to do it
    State.findAll({ where: {country_id: req.params.id}, include:[{model: models.Country, as: 'countries'}] }).then(states => {
        console.log(states);
        res.json(states);
    }).error(err => {
        res.send('error has occured');
    });
    
});

module.exports = router;