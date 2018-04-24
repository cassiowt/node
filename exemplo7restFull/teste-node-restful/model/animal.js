
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Criação do modelo
var animalSchema = new Schema({
    apelido: String,
    dono: { type: String, required: true, unique: true },
    vivo: Boolean,
    endereco: String,
    dataNascimento: Date,
    dataCriacao:  { type: Date, default: Date.now },
    dataAlteracao:  { type: Date, default: Date.now }
});



module.exports = animalSchema;