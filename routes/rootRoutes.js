import express from 'express';
import {User} from '../model/User';
import {Game} from '../model/Game';

var router = express.Router();

router.route('/');

router.get('/', function(req, res){

// si no hay return marca error cant sent headers after sending
    return res.redirect('/index'); 

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

    console.log('TERMINAR');
    //res.render('../src/index.ejs');
     Game.find(function (err, games) {
      if (err) return console.error(err)
      //res.render('../dist/index.html');
      res.render('../src/index.ejs', {games: games});
    });
});

router.get('/index', function(req, res){

/*
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('ok');
*/   
    var newGame = new Game
    ({ 
        title: 'Silence', 
        platform: 'XBOX-ONE',
        price: 10
    });

    newGame.save(function (err, fluffy) {
      if (err) return console.error(err);
    });


    Game.find(function (err, games) {
      if (err) return console.error(err);
      return res.render('../src/index.ejs', {games: games});
    });

    console.log('TERMINAR')
    //res.render('../src/index.ejs');
    //res.sendFile(path.join(__dirname, '../src/index.html'));
});

router.get('/game', function(req, res){
    console.log('TERMINAR')
    res.render('../src/game-detail.ejs');
    //res.sendFile(path.join(__dirname, '../src/index.ejs'));
});

router.get('/faqs', function(req, res){
    console.log('TERMINAR')
    res.render('../src/faqs.ejs');
    //res.sendFile(path.join(__dirname, '../src/index.ejs'));
});

router.get('/payform', function(req, res){
    console.log('TERMINAR')
    res.render('../src/payform.ejs');
    //res.sendFile(path.join(__dirname, '../src/index.ejs'));
});

router.get('/signIn', function(req, res){
    console.log('TERMINAR')
    res.render('../src/sign-in.ejs');
    //res.sendFile(path.join(__dirname, '../src/index.ejs'));
});

router.get('/signUp', function(req, res){
    console.log('TERMINAR')
    res.render('../src/sign-up.ejs');
    //res.sendFile(path.join(__dirname, '../src/index.ejs'));
});

router.get('/credit', function(req, res){
    console.log('TERMINAR')
    res.render('../src/credit-card.ejs');
    //res.sendFile(path.join(__dirname, '../src/index.ejs'));
});


router.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  });

router.get('/users', function(req, res){
    res.json([
        {"id": 1, "firstName":"Bob","lastName":"Smith", "email":"bob@gmail.com"},
        {"id": 2, "firstName":"Tammy","lastName":"Glendal", "email":"tammy@gmail.com"},
        {"id": 3, "firstName":"Tina","lastName":"Jenner", "email":"tina@gmail.com"}
    ]);

    //res.sendFile(path.join(__dirname, '../src/index.html'));
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

export default {};
module.exports = router;
