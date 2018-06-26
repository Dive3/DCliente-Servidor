var express = require('express');
var path = require('path');
var http = require('http');

var app = express();

var publicPath = path.join(__dirname, 'public');
app.use('/fotos',express.static(publicPath));

app.use((request, response) => {
    responese.writeHead(200,{'Content-Type': 'text/plain'});
    response.end('No se encontró ningun archivo');
});

http.createServer(app).listen(3000);