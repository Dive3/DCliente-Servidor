var express = require('express');
var path = require('path');
var app = express();

var api = require('./routes/api');
var api2 = require('./routes/api2')

app.use("/api", api);
app.use("/apiV2", api2);


app.get("/", (req,res)=> {
    res.send("<h1>Página Principal</h1>");
});

app.listen(3000, () =>{
    console.log("La aplicación esta corriendo por el puerto 3000");
});