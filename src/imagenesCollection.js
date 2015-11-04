var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = mongoose.Schema({
    imagen: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Imagen', schema);