var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
var entries = [];
app.locals.entries = entries;

var IP_MALVADA = "192.168.0.1"
var publicPath = path.join(__dirname, 'public');

app.get('/', (request, response) => response.render('index'));
app.get('/new-entry',(request, response) => response.render('new-entry'));
app.get('/armas',(request, response) => response.render('armas'));
app.get('/clase',(request, response) => response.render('clase'));
app.get('/victimas',(request, response) => response.render('victimas'));


app.use((request, response, next)=> {
    if (request.ip === IP_MALVADA){
        response.status(401).send("Intento de acceso no autorizado");
    }else{
        next();
    }
});


app.post('/new-entry', (request, response) => {
    if(!request.body.title || !request.body.dir || !request.body.tel || !request.body.insta){
        response.status(400).send('Las víctimas deben tener todos los datos pedidos, es importante para identificarlo y encontrarlo.');
        return;

    }
    entries.push({
        title: request.body.title,
        dir: request.body.dir,

    });
    response.redirect('/');
});


http.createServer(app).listen(3000, () =>
console.log('Los zombies estan corriendo en el puerto 3000'));