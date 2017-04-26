import passport from 'passport';
import strategy from 'passport-local';
import mongoose from 'mongoose';

var localStrategy = strategy.Strategy;

module.exports = function() {
    passport.use(new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username, password, done){
        //find user in database

        // done(null, user); si fue correcto el usuario y contraseña
        // done('Bad password', null) si fue incorrecto el metodo de autentificación
        // done(null, false, {message: 'Bad password'});
        var user = {
            username: username,
            password: password
        };
        done(null, user);
    }));
}
