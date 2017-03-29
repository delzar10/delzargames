import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import config from '../webpack.config.dev';
import bookRouter from '../routes/bookRoutes';
import adminRouter from '../routes/adminRoutes';
import mongoose from './connectDB';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import {User} from '../model/User';
import {Game} from '../model/Game';


/* eslint-disable no-console */
const port = 9000;
const app = express();
const compiler = webpack(config);
const router = express.Router();
const mongoClient = mongoose.MongoClient;

var nav = [
    {
      Link: '/Books',
      Text: 'Book'
    },
    {
      Link: '/Authors',
      Text: 'Author'
    }]

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
app.use(require('webpack-dev-middleware')(compiler, {

    noInfo: false, // No especial info
    stats: { colors: true },
    publicPath: config.output.publicPath // Public path
}));

// Engine view EJS
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', './src');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {

  console.log('Paramas:', req.params);

  // if the user ID is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // otherwise pass control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  console.log('regular');
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  console.log('special');
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

// mount the router on the app
app.use('/', router);

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


app.get('/', function(req, res){
    /*
    var newGame = new Game
    ({ 
        title: 'Silence', 
        platform: 'XBOX-ONE',
        price: 10
    });

    newGame.save(function (err, fluffy) {
      if (err) return console.error(err);
    });
*/
    Game.find(function (err, games) {
      if (err) return console.error(err);
      console.log(games);
      //res.render('../src/index.ejs', {games: games});
    });

    console.log('TERMINAR')
    //res.render('../src/index.ejs');
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/game', function(req, res){
    console.log('TERMINAR')
    res.render('../src/game-detail.ejs');
    //res.sendFile(path.join(__dirname, '../src/index.ejs'));
});

app.get('/sign', function(req, res){
    console.log('TERMINAR')
    res.render('../src/sign-up.ejs');
    //res.sendFile(path.join(__dirname, '../src/index.ejs'));
});

app.get('/credit', function(req, res){
    console.log('TERMINAR')
    res.render('../src/credit-card.ejs');
    //res.sendFile(path.join(__dirname, '../src/index.ejs'));
});

app.use('/myLogger', function (req, res, next) {
    console.log(req.originalUrl)
    console.log(req.method)
    console.log('LOGGED FUNCTION')
    next()
});

app.get('/myLogger', function (req, res) {
  res.send('Hello World!')
})

app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  });

app.get('/users', function(req, res){
    res.json([
        {"id": 1, "firstName":"Bob","lastName":"Smith", "email":"bob@gmail.com"},
        {"id": 2, "firstName":"Tammy","lastName":"Glendal", "email":"tammy@gmail.com"},
        {"id": 3, "firstName":"Tina","lastName":"Jenner", "email":"tina@gmail.com"}
    ]);

    //res.sendFile(path.join(__dirname, '../src/index.html'));
});



// Excepciones a la regla de no console en este archivo:
/* eslint-disable-line no-console */

app.listen(port, function(err){
    if (err){
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
});
