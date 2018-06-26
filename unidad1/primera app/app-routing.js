var express = require('express');
var path = require ('path');
var http = require('http');

var app = express();

var IP_MALVADA = "192.168.0.1"

app.use((request, response, next)=> {
    if (request.ip === IP_MALVADA){
        response.status(401).send("Intento de acceso no autorizado");
    }else{
        next();
    }
});

var publicPath = path.join(__dirname,'public')
app.use('fotos', express.static(publicPath));

app.get('/', (request, respone)=> {
    response.end('Bienvenido a mi página principal');
});

app.get('/about', (request, response)=> {
    response.end('Bienvenido a mi pagina acerca de como fracasar en la vida.');
});

app.get('/weather', (request, response)=> {
    response.end('Hoy habra un clima oleado');
});

app.get('/bienvenida/:nombre', (request, response)=>{
    response.end('bienvenido' + request.params.nombre + '.');
});

app.use((request, response) => {
    response.writeHead(404, {"Content-type": "text/html"});
    response.end("<h2>404 not found</h2>")
    //response.redirect('http://google.com.mx);
})

http.createServer(app).listen(3000);