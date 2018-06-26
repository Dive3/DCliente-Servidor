var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
var entries = [];
app.locals.entries = entries;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (request, response) => response.render('index'));

app.get('/new-entry',(request, response) => response.render('new-entry'));

app.post('/new-entry', (request, response) => {
    if(!request.body.title || !request.body.body){
        response.status(400).send('Las entradas deben de tener un titulo y un mensaje');
        return;

    }
    entries.push({
        title: request.body.title,
        body: request.body.body,
        created: new Date()
    });
    response.redirect('/');
});

app.use((request, response) => response.status(400).render('404'));

http.createServer(app).listen(3000, () =>
console.log('La aplicación Guestbook está corriendo en el puerto 3000'));