import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import config from '../webpack.config.dev';
import rootRouter from '../routes/rootRoutes';
import bookRouter from '../routes/bookRoutes';
import consoleRouter from '../routes/consoleRoutes';
import mongoose from 'mongoose';
import session from 'express-session';
import helmet from 'helmet';


//let url = "mongodb://localhost/mydb";
mongoose.connect((process.env.PROD_MONGODB || url));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Console Log Access Correct");
});


/* eslint-disable no-console */
const port = (process.env.PORT || 8080);
const app = express();
const compiler = webpack(config);
const router = express.Router();
const mongoClient = mongoose.MongoClient;



app.set('port', (process.env.PORT || 8080));

// Use the session middleware


// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false, // No especial info
    stats: { colors: true },
    publicPath: config.output.publicPath // Public path
}));

// Engine view EJS
//app.use(express.static('public'));
//app.use(helmet());
app.use(express.static('src'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 6000 }
}));


app.set('trust proxy', 1);
app.set('views', 'src');
app.set('view engine', 'ejs');


app.use('/**', isAuthenticated);
app.use('/', rootRouter);
app.use('/Books', bookRouter);
app.use('/Console', consoleRouter);

app.disable('x-powered-by');

// a middleware function with no mount path. This code is executed for every request to the router

/*
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

app.use(function (req, res, next) {
    console.log(req.originalUrl)
    console.log(req.method)
    console.log('LOGGED')
    next()
}, function (req, res, next) {
    console.log(req.originalUrl)
    console.log(req.method)
    console.log('LOGGED')
    next()
}, function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
*/



/*
app.use('/myLogger', function (req, res, next) {
    console.log(req.originalUrl)
    console.log(req.method)
    console.log('LOGGED FUNCTION')
    next()
});

app.get('/myLogger', function (req, res) {
  res.send('Hello World!')
});
*/

/*
app.use(function setUser(req, res, next){
    res.locals.user = req.session.user;
    next();
});*/



// Access the session as req.session
function isAuthenticated(req, res, next) {
  var user = req.session.user;
  console.log("entro: " + req.session); 
  console.log("Session: " + req.session);

  if (user){
      if (req.url.indexOf('sign') != -1
      ||  req.url.indexOf('log')  != -1)
        return res.redirect('/account');
  }

  if (!user){
      if (req.url.indexOf('sign') != -1
      &&  req.url.indexOf('log')  != -1
      &&  req.url.indexOf('index') != -1)
        return res.redirect('/signIn');
  }

  return next();
}


// Excepciones a la regla de no console en este archivo:
/* eslint-disable-line no-console */

app.listen(app.get('port'), function(err){
    if (err){
        console.log(err);
    } else {
        console.log("delzar-games is running...");
    }

    app.locals.cart = [];
});

export default {};
