import passport from 'passport';

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){
        done(null, user); //Segundo parametro llave del usuario
    });

    passport.deserializeUser(function(user, done){
        done(null, user); //Segundo parametro llave del usuario
    });

    im
};
