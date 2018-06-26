var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var ip_mortal = "192.168.0.1"



var app = express();
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
var entries = [];
app.locals.entries = entries;

var publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.get("/", function(req, res){
    res.render("index");
});
app.get('/nueva-victima',(request, response) => response.render('nueva-victima'));
app.get('/armas',(request, response) => response.render('armas'));
app.get('/clases',(request, response) => response.render('clases'));
app.get('/victimas',(request, response) => response.render('victimas'));

app.post('/nueva-victima', (request, response) => {
    if(!request.body.title || !request.body.direccion || !request.body.telefono || !request.body.instagram || !request.body.victim){
        response.status(400).send('Las víctimas deben tener todos los datos pedidos, es importante para identificarlo y encontrarlo.');
        return;

    entries.push({
       title: request.body.title,
        direccion: request.body.body,
        telefono: request.body.telefono,
        instagram: request.body.instagram,
        victim: request.body.victim,
        created: new Date()

    });
    response.redirect("/");
}});

app.use((request, response) => response.status(400).render('404'));

http.createServer(app).listen(3000, () =>
console.log('Los zombies están corriendo en el puerto 3000'));