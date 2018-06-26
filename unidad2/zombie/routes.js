var express = require("express");
var Zombie = require("./models/zombie");
var Arma = require("./models/armas");

var passport = require("passport");

var router = express.Router();

router.use((req, res, next) => {
    res.locals.currentZombie = req.zombie;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

router.get("/", (req, res, next) =>{
    Zombie.find()
    .sort({ createdAt: "descending"})
    .exec((err, zombies) => {
        if(err){
            return next(err);
        }
        res.render("index", {zombies: zombies});
    });
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", (req, res, next)=>{
    var username = req.body.username;
    var password = req.body.password;

    Zombie.findOne({username: username}, (err, zombie) => {
        if(err){
            return next(err);
        }
        if(zombie){
            req.flash("error", "El nombre de usuario ya ha sido tomado por otro zombie");
            return res.redirect("/signup");
        }
        var newZombie = new Zombie({
            username: username,
            password: password
        });
        newZombie.save(next);
        return res.redirect("/");
    });
});

router.get("/zombies/:username", (req, res, next) => {
    Zombie.findOne({username: req.params.username}, (err, zombie) => {
        if(err){
            return next(err);
        }
        if(!zombie){
            return next (404);
        }
        res.render("profile", {zombie:zombie});
    });
});

//armas
router.get("/armas", (req, res, next) => {
    Arma.find()
    .exec((err, armas) => {
        if(err){
            return next(err);
        }
        res.render("armas", {armas: armas});
    });
});

router.get("/agregarArma", (req, res) => {
    res.render("agregarArma");
});

router.post("/armas", (req, res, next)=>{
    var descripcion = req.body.descripcion;
    var fuerza = req.body.fuerza;
    var categoria = req.body.categoria;
    var municion = Boolean(req.body.municion);

    Arma.findOne({descripcion: descripcion}, (err, arma) => {
        var newArma = new Arma ({
            descripcion: descripcion,
            fuerza: fuerza,
            categoria: categoria,
            municion: municion
        });
        newArma.save(next);
        return res.redirect("/armas");
    });
});


module.exports = router;