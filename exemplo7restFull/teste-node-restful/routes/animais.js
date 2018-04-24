var express = require('express');
var restful = require('node-restful')
var animal = require('../model/animal')
var app =  express();

var Animal = app.resource = restful.model('animal', animal).methods(['get', 'post', 'put', 'delete']);


Animal.route('recommend', function(req, res, next) {
    console.log(res.locals.bundle)
  //res.render('index', { title: 'ere' });
});


/*Animal.after('get', function(req, res, next) {
    var animais = res.locals.bundle;
    console.log(animais[1])
    res.render('animais', { title: 'Lista Animais', animais: animais});

});*/


Animal.route('moreinfo', {
    detail: true,
    handler: function(req, res, next) {
        // req.params.id holds the resource's id
        res.send("I'm at /animal/:id/moreinfo!")
    }
});

module.exports = Animal;
