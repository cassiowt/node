var express = require('express');
var app = express();
var port = 3021;
var ser = '127.0.0.1';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animais');


var Animal = require('./model/animal');
var Dono = require('./model/dono');

app.get('/', function(req, res) {
    res.write("\/cadatra - Cadastrar um animal\n");
    res.write("\/lista   - Litar animais\n");
    res.write("\/altera  - Alterar um animal\n");
    res.write("\/remove  - Remover um animal\n");
    res.write("\/cadatraDono - Cadastrar um dono\n");
    res.write("\/listaDono   - Litar dono\n");
    res.write("\/alteraDono  - Alterar um dono\n");
    res.write("\/removeDono  - Remover um dono\n");
    res.end("-------------------------------------");

});

app.get('/cadastra', function( req, res) {
    var novoAnimal = Animal({
        apelido: "Dois",
        dono: "Andre",
        vivo: true,
        endereco: "Rua Frei Clemente, 6",
        dataAlteracao: new Date()
    });

    novoAnimal.save(function(err) {
        if (err){
            console.log('Erro: ', err);
            msg = 'Erro: ' + err;
            return res.end(msg);
        }
        res.end('Salvo o Animal: ' +  novoAnimal.apelido);
    });
});

app.get('/cadastraDono', function( req, res) {
    var novoDono = Dono({
        nome: "Cassio Trindade",
        telefone: "9999999999",
        endereco: "Acenida Varginha Feliz",
        ativo: true,
        credito: 10000,
    });

    novoDono.save(function(err) {
        if (err){
            console.log('Erro: ', err);
            msg = 'Erro: ' + err;
            return res.end(msg);
        }
        res.end('Salvo o Dono: ' +  novoDono.nome);
    });
});

app.get('/listaDono' , function(req, res) {
    Dono.find({}, function (err, donos) {
        if (err){
            console.log('Erro: ', err);
            msg = 'Erro: ' + err;
            return res.end(msg);
        }
        res.end(JSON.stringify(donos));
    });
})

app.get('/alteraDono/:id' , function(req, res) {
    const id = req.params.id;
    Dono.findByIdAndUpdate(id , {nome: 'PAULO JOSE'}, function (err, dono) {
        if (err){
            console.log('Erro: ', err);
            msg = 'Erro: ' + err;
            return res.end(msg);
        }
        res.end(JSON.stringify(dono));
    });
});

app.get('/removeDono/:id', function(req, res) {
    const id = req.params.id;
    Dono.findByIdAndRemove("\"" + id + "\"" ,  function (err, dono) {
        if (err){
            console.log('Erro: ', err);
            msg = 'Erro: ' + err;
            return res.end(msg);
        }

        res.end(" Removido Dono " + dono.nome);
    });
});


console.log(" Executando em " + ser + ":" + port);
app.listen(port);