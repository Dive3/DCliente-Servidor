var express = require("express");
var Zombie = require("./models/zombie");
var Arma = require("./models/armas");

var passport = require("passport");
var acl = require("express-acl");

var router = express.Router();

acl.config({
    baseUrl: '/',
    defaultRole: 'zombie',
    decodedObjectName: 'zombie',
    roleSearchPath: 'zombie.role'
});

router.use((req, res, next) => {
    res.locals.currentZombie = req.zombie;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    if (req.session.passport){
        if(req.zombie){    
        req.session.role = req.zombie.role
        }
    }
    console.log(req.session);
    next();
});
;

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

//ENTRAR
router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", (req, res, next)=>{
    var username = req.body.username;
    var password = req.body.password;
    var role = req.body.role;

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
            password: password,
            role: role
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
//login
router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("login", {
    successRedirect :"/",
    failureRedirect : "/login",
    failureFlash: true
}));

//logout
router.get("/logout", (req, res ) => {
    req.logout();
    res.redirect("/");
});

//edit
router.get("/edit",ensureAuthenticated,(req,res) => {
    res.render("edit");
});

router.post("/edit",ensureAuthenticated, (req, res, next) => {
    req.zombie.displayName= req.body.displayName;
    req.zombie.bio = req.body.bio;
    req.zombie.save((err) =>{
        if(err){
            next(err);
            return;
        }
        req.flash("info","Perfil actualizado!");
        res.redirect("/edit");
    });
});

//autenticacion
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        next();
    }else {
        req.flash("info", "Necesitas iniciar sesion para poder hacer esta seccion");
        res.redirect("/login");
    }
}



module.exports = router;