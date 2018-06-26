var path = require('path');
var express = require('express');
var zipdb = require ('zippity-do-dah');
var Forecastlo = require('forecastio');

var app = express();

var weather = new Forecastlo("649851933f7ca976d400f9c635587bcd");

app.use(express.static(path.resolve(__dirname,"public")));
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", function(req, res){
    res.render("index");
});

app.get(/^\/(\d{5})$/, function(req, res, next){
    var zipcode = req.params[0];
    var location = zipdb.zipcode(zipcode);
    if (!location.zipcode){
        next();
        retutn;
    }

    var latitude = location.latitude;
    var longitude = location.longitude;

    weather.forecast(latitude, longitude, function (err, data) {
        if(err){
            next();
            return;
        }
        res.json({
            zipcode: zipcode,
            temperature: data.currently.temperature
        });
     });
    });

    app.use(function(req, res){ 
        res.status(404).render("404");
    });

    app.listen(3000);