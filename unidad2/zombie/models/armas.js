var mongoose = require ("mongoose");

var armaSchema = mongoose.Schema({
    descripcion: { type: String, required: true, unique: true},
    fuerza: { type: Number, required: true},
    categoria: {type:String},
    municiones: { type: Boolean },
});

var donothing = () =>{
}

var Arma = mongoose.model("Arma", armaSchema);
module.exports = Arma;