var express = require('express');
var User = require('../models').User;
var models = require('../models');
var sequelize = require('../sequelize')();
const fileUpload = require('express-fileupload');


var router = express.Router();
router.get('/', function(req, res){
    User.findAll({include:[{model: models.Country, as: 'countries'}, {model: models.State, as: 'states'}]}).then(users => {
        res.json(users);
    },function(err){
		console.log(err);
	}
	);
});

router.get('/:id', function(req, res){
    console.log('getting one user');   
    // another ways to do it
    User.findOne({ where: {id: req.params.id}, include:[{model: models.Country, as: 'countries'}, {model: models.State, as: 'states'}] }).then(user => {
        console.log(user);
        res.json(user);
    }).error(err => {
        res.send('error has occured');
    });
    
});



router.post('/', function(req, res){
    User.create({ 
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        address2: req.body.address2,
        zipcode: req.body.zipcode,
        city: req.body.city,
        state_id: req.body.state_id,        
        country_id: req.body.country_id,        
    }).then(user => {
        console.log(user.get({
          plain: true
        }));
        res.send(user);
    });
    /* var image = req.files.image;
    if (!image){
        return res.status(400).send('No files were uploaded.');
    }
    else{
        var data = req.body;
        if(image){
            data.image = image.name;
        }
        Book.create(data).then(book => {
            console.log(image);
            image.mv('uploads/'+image.name, function(err) {
                if (err)
                return res.status(500).send(err);
             
                res.send('File uploaded!');
            });
            console.log(book.get({plain: true}));
            res.send(book);
        });
        
    } */
    /*
    Book.create({ 
        title: req.body.title,
        author: req.body.author, 
        category: req.body.category,
        type: req.body.type 
    }).then(book => {
        console.log(book.get({
          plain: true
        }));
        res.send(book);
    });
    */
});

/*
router.post('/', function(req, res){
    Book.create({ 
        title: req.body.title,
        author: req.body.author, 
        category: req.body.category,
        type: req.body.type 
    }).then(book => {
        console.log(book.get({
          plain: true
        }));
        res.send(book);
    });
});
*/

router.put('/:id', function(req, res){
    User.update({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        address2: req.body.address2,
        zipcode: req.body.zipcode,
        city: req.body.city,
        state_id: req.body.state_id,        
        country_id: req.body.country_id,      
    },{ 
        where: { id: req.params.id } 
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', function(req, res){
    User.destroy({ 
        where: { id: req.params.id } 
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;