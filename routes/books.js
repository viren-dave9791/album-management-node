var express = require('express');
var Book = require('../models').Book;
var models = require('../models');
var sequelize = require('../sequelize')();
const fileUpload = require('express-fileupload');


var router = express.Router();
router.get('/', function(req, res){
    Book.findAll({include:[{model: models.Category, as: 'categories'}]}).then(books => {
        res.json(books);
    },function(err){
		console.log(err);
	}
	);
});

router.get('/:id', function(req, res){
    console.log('getting one book');
    /*
    Book.findById(req.params.id).then(book => {
        console.log(book);
        sequelize.query('SELECT * FROM categories WHERE id = '+book.category).then(function (categoryData) {
            console.log(categoryData[0][0]);
            book.dataValues.categoryData = categoryData[0][0];
            res.json(book);
        });
    });
    */
    // another ways to do it
    Book.findOne({ where: {id: req.params.id}, include:[{model: models.Category, as: 'categories'}] }).then(book => {
        console.log(book);
        res.json(book);
    }).error(err => {
        res.send('error has occured');
    });
    
});

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
    Book.update({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        type: req.body.type
    },{ 
        where: { id: req.params.id } 
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', function(req, res){
    Book.destroy({ 
        where: { id: req.params.id } 
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;