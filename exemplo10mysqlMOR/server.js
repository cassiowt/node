var express = require('express');
var app = express();
var port = 3018;

var mysql = require('mysql'); // Mysql include
var path = require('path');
var bodyParser = require("body-parser"); // Body parser for fetch posted data

var Sequelize = require('sequelize');

var sequelize = new Sequelize('pet', 'root', 'senha', {
    host: 'localhost',
    dialect: 'mysql'
});


var Usuario = sequelize.define('usuario', {
    nome:Sequelize.STRING,
    senha: Sequelize.STRING,
});

sequelize.sync({force:true}).then(function (data) {
    console.log(data.config.database)
        if(data){
            console.log('Item table created successfully');
        }else{
            console.log('An error occur while creating table');
        }
});

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded(
        { extended: false }
));

app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.get('/add', function(req, res) {
    var newUser = Usuario.build({
        nome: 'John',
        senha: 'Indiana',
    });
    newUser.save().then(function(data) {
        console.log(data);
        res.json(data);
    })
});

app.get('/lista',function(req,res){
    var data = {
        "Data":""
    };

    Usuario.find({limit: 100}).then(function (data) {
        console.log(data);
        res.json(data);
    });
});

app.post('/login',function(req,res){
    var email = req.body.email;
    var pass = req.body.password;
    console.log(req.body)
    var newUser = Usuario.build({
        nome: email,
        senha: pass,
    });
    newUser.save().then(function(data) {
        console.log(data);
        res.json(data);
    })

});


console.log(" Executando em localhost:" + port);
app.listen(port);