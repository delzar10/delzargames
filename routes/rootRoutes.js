import express from 'express';
import {User} from '../model/User';
import {Game} from '../model/Game';
import {Console} from '../model/Console';
import {Vendor} from '../model/Vendor'
import {ArticleStatus} from '../model/ArticleStatus';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Util from '../src/js/utils/util'

const util = new Util();

var router = express.Router();

router.route('/');

router.get('/', function(req, res){

// si no hay return marca error cant sent headers after sending
    return res.redirect('/index');
});

router.get('/index', function(req, res){

/*
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('ok');

    var newGame = new Game
    ({
        title: 'Silence',
        platform: 'XBOX-ONE',
        price: 10,
        a.img.data = fs.readFileSync(imgPath);
        a.img.contentType = 'image/png';
    });

    newGame.save(function (err, fluffy) {
      if (err) return console.error(err);
    });

*/
    /*Game.find(function (err, games) {
      if (err) return console.error(err);
      return res.render('../src/views/index.ejs', {games: games});
    });
    */

    Game.find({ platform: 'PS3' }).limit(4).exec().then(
        function (ps3Games){
            var result = [];
            result.push(ps3Games);
            return result;
    }).then(function (result){
        return Game.find({ platform: 'PS4' }).limit(4).exec().then(function (ps4Games){
            result.push(ps4Games);
            return result;
        });
    }).then(function (result){
        return Game.find({ platform: 'XBOX-36O' }).limit(4).exec().then(function (xbox360Games){
            result.push(xbox360Games);
            return result;
        });
    }).then(function (result){
        return Game.find({ platform: 'XBOX-ONE' }).limit(4).exec().then(function (xboxOneGames){
            result.push(xboxOneGames);
            return result;
        });
    }).then(function (result){
        return Game.find({ platform: '3DS' }).limit(4).exec().then(function (dsGames){
            result.push(dsGames);
            return result;
        });
    }).then(function (result){
        return Game.find({ platform: 'WIIU' }).limit(4).exec().then(function (wiiuGames){
            result.push(wiiuGames);
            return result;
        });
    }).then(function(result){
        console.log(result);
        res.render('../src/views/index.ejs', {
            ps3Games: result[0],
            ps4Games: result[1],
            xbox360Games: result[2],
            xboxOneGames: result[3],
            dsGames: result[4],
            wiiuGames: result[5]
        });
    }).then(undefined, function(err){
      console.log(err);
    });

    //res.render('../src/views/index.ejs');
    //res.sendFile(path.join(__dirname, '../src/views/index.html'));
});

router.get('/game', function(req, res){
    res.render('../src/views/game-detail.ejs');
    //res.sendFile(path.join(__dirname, '../src/views/index.ejs'));
});

router.get('/users', function(req, res){
    res.render('../src/views/users.ejs');
    //res.sendFile(path.join(__dirname, '../src/views/index.ejs'));
});

router.get('/consoles', function(req, res){
    res.render('../src/views/consoles.ejs');
    //res.sendFile(path.join(__dirname, '../src/views/index.ejs'));
});

router.get('/games', function(req, res){

    Game.find({}, function(err, games){
        if (err) return console.error(err);
        res.render('../src/views/games.ejs', {games: games});
    });
    //res.sendFile(path.join(__dirname, '../src/views/index.ejs'));
});

router.get('/consoles', function(req, res){
    res.render('../src/views/consoles.ejs');
    //res.sendFile(path.join(__dirname, '../src/views/index.ejs'));
});

router.get('/new-admin', function(req, res){
    res.render('../src/views/admin-form.ejs');
    //res.sendFile(path.join(__dirname, '../src/views/index.ejs'));
});

router.get('/new-game', function(req, res){
    res.render('../src/views/game-form.ejs');
    //res.sendFile(path.join(__dirname, '../src/views/index.ejs'));
});

router.get('/new-console', function(req, res){
    async function queryResult(){
        console.log("Hola DESDE METODO ASYNC");
        const vendors = await Vendor.find({});
        console.log(vendors);
        const statuses = await ArticleStatus.find({});
        console.log(statuses);
        return {vendors, statuses};   
    }
    console.log("Entre la funcion ASYNC");
    queryResult().then( results =>{
        console.log("DENTRO DE LO ULTIMO la funcion ASYNC");
        console.log("Resultados: ");
        console.log(results);
        return res.render(path.join(__dirname, '../src/views/console-form.ejs', {vendors:results[0], statuses:results[1]}));
    })
    
});




router.get('/contact', function(req, res){
      
    res.render('../src/views/contact.ejs');
    //res.sendFile(path.join(__dirname, '../src/views/index.ejs'));
});

router.get('/payform', function(req, res){
    res.render('../src/views/payform.ejs');
    //res.sendFile(path.join(__dirname, '../src/views/index.ejs'));
});

router.get('/signIn', function(req, res){
    req.session.rols = "Logged";
    res.render('../src/views/sign-in.ejs');
    //res.sendFile(path.join(__dirname, '../src/views/index.ejs'));
});

router.get('/signUp', function(req, res){
    res.render('../src/views/sign-up.ejs');
    //res.sendFile(path.join(__dirname, '../src/views/index.ejs'));
});

router.get('/credit', function(req, res){
    res.render('../src/views/credit-card.ejs');
    //res.sendFile(path.join(__dirname, '../src/views/index.ejs'));
});

router.get('/cart', function(req, res){
    res.render('../src/views/cart.ejs');
    //res.sendFile(path.join(__dirname, '../src/views/index.ejs'));
});

router.get('/account', function(req, res){
    res.render('../src/views/account.ejs');
});

router.get('/user-form', function(req, res){
    res.render('../src/views/user-form.ejs');
});

router.get('/password-form', function(req, res){
    res.render('../src/views/password-form.ejs');
});

router.get('/invoice-form', function(req, res){
    res.render('../src/views/invoice-form.ejs');
});

router.get('/admin', function(req, res){
    res.render('../src/views/admin.ejs');
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
  res.sendFile(path.join(__dirname, '../src/views/index.html'));
});

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  console.log('special');
  res.sendFile(path.join(__dirname, '../src/views/index.html'));
});

router.get('/form', function (req, res) {
        console.log('template form');

        res.render('../src/views/form.ejs', {
            title: "Login", //page title
            action: "/login", //post action for the form
            fields: [
            {name:'email',type:'text',property:'required'},   //first field for the form
            {name:'password',type:'password',property:'required'}   //another field for the form
            ]
        });
    });



 var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
        file.originalname = util.renameImage(file.originalname, req.body.gameName);
        console.log(file.originalname);
        let imgPath = path.join(__dirname, '../src/images/', req.body.gameConsole);

         fs.exists(imgPath, exist => {
             console.log("Existe: " + exist);
             if (!exist){
                fs.mkdir(imgPath , err => { 
                    if (err) 
                        console.log(err);
                });
             } 

             var newGame = new Game ({
                  title: req.body.gameName,
                  platform: req.body.gameConsole,
                  price: req.body.gamePrice,
                  status: req.body.gameStatus,
                  imgName: file.originalname,
                  imgPath: path.join('/images/', req.body.gameConsole, '/'),
                  imgFullPath: path.join('/images/', req.body.gameConsole, '/', file.originalname)
              });

              newGame.save(function (err, fluffy) {
                if (err) return console.error(err);
              });

              callback(null, imgPath);
         });
     },
     filename: function(req, file, callback) {
         //callback(null, req.body.gameName);
         
         callback(null, file.originalname);
         //callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
 });

 var upload = multer({
     storage: Storage
 }).array("gameImg", 3); //Field name and max count
 
router.post("/save-game", function(req, res) {
 
     upload(req, res, function(err) {
         if (err) {
             return res.end("Something went wrong!" + err);
         }
/*
            var newGame = new Game ({
                title: req.body.gameName,
                platform: req.body.gameConsole,
                price: req.body.gamePrice,
                status: req.body.gameStatus,
                imgPath: path.join(__dirname, '../src/images/', req.body.gameConsole),
                imgName: file.originalname
            });

            newGame.save(function (err, fluffy) {
                if (err) return console.error(err);
            });
*/
         return res.end("File uploaded sucessfully!.");
     });
 });

 router.post("/save-user", function(req, res){
    var newUser = new User ({
                  person:{
                      Name:{
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                       },
                       cellphone: req.body.cellphone
                  },
                  userName: req.body.username,
                  email: req.body.email,
                  password: req.body.password,
                  status: "Activo",
                  roles: "Cliente",
   });

   newUser.save(function (err, fluffy) {
      if (err) return console.error(err);
    });

    res.redirect('/');
 });

export default {
    router
};
module.exports = router;