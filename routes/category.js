var express = require('express');
var Category = require('../models').Category;
var models = require('../models');
var sequelize = require('../sequelize')();
var router = express.Router();

/* sequelize.query('SELECT * FROM categories').then(function (data) {
    console.log(data);
});
 */
router.get('/', function(req, res){
    Category.findAll().then(category => {
        console.log(category);
        res.json(category);
    });
});

router.get('/:id', function(req, res){
    console.log('getting one book');
    /*
    Category.findById(req.params.id).then(category => {
        console.log(category);
        res.json(category);
    });
    */
    // another ways to do it
    Category.findOne({ where: {id: req.params.id} }).then(category => {
        console.log("category",category);
        sequelize.query('SELECT b.*,c.name FROM books as b INNER JOIN categories as c on c.id = b.category where b.category = '+ req.params.id).then(function (data) {
            res.json(data[0]);
        });
    }).error(err => {
        res.send('error has occured');
    });
});

router.post('/', function(req, res){
    Category.create({ 
        name: req.body.name
    }).then(category => {
        console.log(category.get({
          plain: true
        }));
        res.send(category);
    });
});

router.put('/:id', function(req, res){
    Category.update({
        name: req.body.name
    },{ 
        where: { id: req.params.id } 
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', function(req, res){
    Category.destroy({ 
        where: { id: req.params.id } 
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;