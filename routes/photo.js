var express = require('express');
var Photo = require('../models').Photo;
var models = require('../models');
var sequelize = require('../sequelize')();
const fileUpload = require('express-fileupload');


var router = express.Router();
router.get('/', function(req, res){
    Photo.findAll({where: {album_id: req.params.id}, include:[{model: models.Album, as: 'albums'}]}).then(photos => {
        res.json(photos);
    },function(err){
		console.log(err);
	}
	);
});

router.get('/:id', function(req, res){
    console.log('getting one user');   
    // another ways to do it
    Photo.findOne({ where: {id: req.params.id}, include:[{model: models.Album, as: 'albums'}] }).then(photo => {
        console.log(photo);
        res.json(photo);
    }).error(err => {
        res.send('error has occured');
    });
    
});



router.post('/', function(req, res){
    var image = req.files.image;
    if (!image){
        return res.status(400).send('No files were uploaded.');
    }
    else{
        var data = req.body;
        if(image){
            data.image = image.name;
        }
        Photo.create(data).then(photo => {
            console.log(image);
            image.mv('uploads/'+image.name, function(err) {
                if (err)
                return res.status(500).send(err);
             
                res.send('File uploaded!');
            });
            console.log(photo.get({plain: true}));
            res.send(photo);
        });
        
    } 
    Photo.create({ 
        name: req.body.name,
        url: req.body.url, 
        thumUrl: req.body.thumUrl,
        album_id: req.body.album_id 
    }).then(photo => {
        console.log(photo.get({
          plain: true
        }));
        res.send(photo);
    });
});

router.put('/:id', function(req, res){
    Photo.update({
        name: req.body.name,
        url: req.body.url, 
        thumUrl: req.body.thumUrl,
        album_id: req.body.album_id     
    },{ 
        where: { id: req.params.id } 
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', function(req, res){
    Photo.destroy({ 
        where: { id: req.params.id } 
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;