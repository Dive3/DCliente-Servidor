var express = require("express");

var api = express.Router();

api.get("/users", (req, res) => {
    res.send("<h1> Estoy en el API -users </h1>");
});

api.get("/numeros/:min/:max", (req, res) => {
    var min = parseInt(req.params.min);
    var max = parseInt(req.params.max);

    if(isNaN(min)||isNaN(max)){
        res.status(400);
        res.json({
            error:"Bad request"
        });
    return;
    }
    
    var result = Math.round((Math.random()*(max - min)) + min);
    res.json({
        result:result
    });
});

module.exports=api;
