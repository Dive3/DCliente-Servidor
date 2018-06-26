var bcrypt = require ("bcrypt-nodejs");
var mongoose = require ("mongoose");

var SALT_FACTOR = 10;

var zombieSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    displayName: { type: String },
    bio: String
});

var donothing = () =>{

}

zombieSchema.pre("save", function(done){
    var zombie = this;
    if(!zombie.isModified("password")){
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
        if(err){
            return done(err);
        }
        bcrypt.hash(zombie.password, salt, donothing, 
            (err, hashedpassword) => {
                if(err){
                    return done(err)
                }
                zombie.password = hashedpassword;
                done();
            });
    });
});

    zombieSchema.methods.checkPassword = (guess, done) => {
        bcrypt.compare(guess, this.password, (err, isMatch) => {
            done(err, isMatch);
        });
    }

    zombieSchema.methods.name = function(){
        return this.displayName || this.username;

    }

    var Zombie = mongoose.model("Zombie",zombieSchema);
    module.exports = Zombie;