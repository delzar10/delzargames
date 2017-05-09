import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import config from '../webpack.config.dev';
import rootRouter from '../routes/rootRoutes';
import bookRouter from '../routes/bookRoutes';
import consoleRouter from '../routes/consoleRoutes';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

let url = "mongodb://delzar:DELzar_10@ds137110.mlab.com:37110/delzar-games";
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

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false, // No especial info
    stats: { colors: true },
    publicPath: config.output.publicPath // Public path
}));

// Engine view EJS
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret: 'library'}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', 'src');
app.set('view engine', 'ejs');

app.use('/', rootRouter);
app.use('/Books', bookRouter);
app.use('/Console', consoleRouter);

// a middleware function with no mount path. This code is executed for every request to the router
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





app.use('/myLogger', function (req, res, next) {
    console.log(req.originalUrl)
    console.log(req.method)
    console.log('LOGGED FUNCTION')
    next()
});

app.get('/myLogger', function (req, res) {
  res.send('Hello World!')
});

// Excepciones a la regla de no console en este archivo:
/* eslint-disable-line no-console */

app.listen(app.get('port'), function(err){
    if (err){
        console.log(err);
    } else {
        console.log("delzar-games is running...");
    }
});

export default {};
