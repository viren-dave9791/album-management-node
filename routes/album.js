var express = require('express');
var Album = require('../models').Album;
var models = require('../models');
var sequelize = require('../sequelize')();
const fileUpload = require('express-fileupload');


var router = express.Router();
router.get('/', function(req, res){
    Album.findAll({where: {user_id: req.params.id}, include:[{model: models.User, as: 'users'}]}).then(albums => {
        res.json(albums);
    },function(err){
		console.log(err);
	}
	);
});

router.get('/:id', function(req, res){
    console.log('getting one album');   
    // another ways to do it
    Album.findOne({ where: {id: req.params.id}, include:[{model: models.User, as: 'users'}] }).then(album => {
        console.log(album);
        res.json(album);
    }).error(err => {
        res.send('error has occured');
    });
    
});

router.post('/', function(req, res){
    Album.create({ 
        name: req.body.name,
        user_id: req.body.user_id              
    }).then(album => {
        console.log(album.get({
          plain: true
        }));
        res.send(album);
    });    
});
router.put('/:id', function(req, res){
    Album.update({
        name: req.body.name           
    },{ 
        where: { id: req.params.id } 
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', function(req, res){
    Album.destroy({ 
        where: { id: req.params.id } 
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;