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
import mongoose from 'mongoose';

const util = new Util();

var router = express.Router();

router.route('/');

router.get('/', function(req, res){

// si no hay return marca error cant sent headers after sending
    return res.redirect('/index');
});

router.get('/index', function(req, res){

    Game.find({}).exec().then(result => {
        console.log("bestArticles: " + result);
        req.app.locals.bestArticles = result;
    });

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

});

router.get('/users', function(req, res){
    User.find({}, (err, users) => {
        res.render('../src/views/users.ejs', {users: users});
    });
});

router.get('/consoles', function(req, res){
    Console.find({}, (err, consoles) => {
        res.render('../src/views/consoles.ejs', {consoles: consoles});
    });
});

router.get('/games', function(req, res){

    Game.find({}, function(err, games){
        if (err) return console.error(err);
        res.render('../src/views/games.ejs', {games: games});
    });
    
});

router.get('/consoles', function(req, res){
    res.render('../src/views/consoles.ejs');
    
});

router.route('/new-admin')
.get(function(req, res){
    res.render('../src/views/admin-form.ejs');
})
.post(function(req, res){
    adminUpload(req, res, err =>{
        if (err) {
            return res.end("Something went wrong!" + err);
        }
        return res.end("Admin register sucessfully!.");
         });
});


router.route('/new-game')
.get(function(req, res){
    res.render('../src/views/game-form.ejs');
})
.post(function(req, res){
    gameUpload(req, res, function(err) {
        if (err) {
            return res.end("Something went wrong!" + err);
        }
        return res.end("File uploaded sucessfully!.");
     });
})
.put(function(req, res){
    res.render('../src/views/game-form.ejs');
})
.delete(function(req, res){
    res.render('../src/views/game-form.ejs');
})

router.route('/new-console')
.get(function(req, res){
    /*async function queryResult(){
        console.log("Hola DESDE METODO ASYNC");
        const vendors = await Vendor.find({});
        console.log(vendors);
        const statuses = await ArticleStatus.find({});
        console.log(statuses);
        return {vendors, statuses};
    }
    
    queryResult().then( results =>{
        
    })*/
    return res.render(path.join(__dirname, '../src/views/console-form.ejs'));
})
.post(function(req, res){
     consoleUpload(req, res, function(err) {
        if (err) {
            return res.end("Something went wrong!" + err);
        }
        return res.end("File uploaded sucessfully!.");
     });
});




router.get('/contact', function(req, res){

    res.render('../src/views/contact.ejs');
    
});

router.get('/payform', function(req, res){
    res.render('../src/views/payform.ejs');
    
});

router.get('/signIn', function(req, res){



    if (typeof req.app.locals.user !== 'undefined') {
        console.log("Entro a Normal");
        console.log(typeof req.app.locals.user);
        console.log(req.app.locals.user);
        console.log(typeof req.app.locals.user.username);
         console.log(req.app.locals.user.username);
        if ( typeof req.app.locals.user.username !== 'undefined'){
            console.log("Entro a redirigir");
            console.log(typeof req.app.locals.user.userName);
            return res.redirect('/account');
         }
    }
    res.render('../src/views/sign-in.ejs');
    
});

router.post('/login', function(req, res){
    User.find({username: req.body.username, password: req.body.password}).limit(1).exec().then(result =>{
        console.log(result);
        req.session.user = result;
        req.app.locals.user = result;
        console.log("Resultado:" + result);
        res.render('../src/views/account.ejs');
    });
});

router.get('/signUp', function(req, res){
    if (typeof req.app.locals.user !== 'undefined'
    &&  typeof req.app.locals.user.userName !== 'undefined'){
        res.redirect('/index');
    }

    res.render('../src/views/sign-up.ejs');
    
});

router.get('/welcome', function(req, res){

});

router.get('/credit', function(req, res){
    res.render('../src/views/credit-card.ejs');
    
});

router.get('/cart', function(req, res){
    res.render('../src/views/cart.ejs');
    
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

router.get('/faqs', function(req, res){
    res.render('../src/views/faqs.ejs');
});

router.param('username', function(req, res, next, username) {
    console.log('doing name validations on ' + username);

    // once validation is done save the new item in the req
    req.username = username;
    // go to the next thing
    next(); 
});


router.get('/delete-user/:username', function(req, res){
    User.find({username: req.username}).remove( err => {
        if (err) console.log(err);
    })

    res.end("Usuario: " + req.username + " fue correctamente Borrado");
});


router.get('/delete-game/:id', function(req, res){
    Game.find({_id: req.params.id}).remove( err => {
        if (err) console.log(err);
    })
    
    res.end("Game: " + req.params.id + " fue correctamente Borrado");
});


router.get('/delete-console/:id', function(req, res){
    Console.find({_id: req.params.id}).remove( err => {
        if (err) console.log(err);
    })
    
    res.end("Consola: " + req.params.id + " fue correctamente Borrado");
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

 router.post("/save-user", function(req, res){
    var newUser = new User ({
                  person:{
                      Name:{
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                       },
                       cellphone: req.body.cellphone
                  },
                  username: req.body.username,
                  email: req.body.email,
                  password: req.body.password,
                  status: "Activo",
                  roles: "Cliente",
   });

   newUser.save(function (err, fluffy) {
      if (err) return console.error(err);
    });

    req.app.locals.user = newUser;

    res.render('../src/views/credit-card.ejs');
 });

 router.get("/logout", (req, res) => {
     req.app.locals.user = undefined;
     req.session.destroy();
     res.redirect("/index");
 })

 router.get('/game/:id', function(req, res, next){
     Game.findById(req.params.id, (err, game) =>{
         if (err) console.log(err);
         res.render('../src/views/game-detail.ejs', {game: game});
     })
 })

 router.get('/add-cart/:id/:size', function(req, res, next){
        Game.findById(req.params.id, (err, result) =>{
            if (err) console.log(err);
            console.log(result[0]);
            req.app.locals.cart.push(result);
            console.log(req.app.locals.cart);
            res.end("Has agregado " + result.title + " Al carrito ");
        })
 });

  var gameStorage = multer.diskStorage({
     destination: function(req, file, callback) {
        file.originalname = util.renameImage(file.originalname, req.body.gameName);
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

              newGame.save(function (err, game) {
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

 var gameUpload = multer({
     storage: gameStorage
 }).array("gameImg", 3); //Field name and max count


var consoleStorage = multer.diskStorage({
     destination: function(req, file, callback) {
        file.originalname = util.renameImage(file.originalname, req.body.name);
        let imgPath = path.join(__dirname, '../src/images/consoles/');

         fs.exists(imgPath, exist => {
             if (!exist){
                fs.mkdir(imgPath , err => {
                    if (err)
                        console.log(err);
                });
             }

            var newConsole = new Console({
                name: req.body.name,
                vendor: req.body.vendor,
                price: req.body.price,
                status: req.body.status,
                imgName: file.originalname,
                imgPath: path.join('/images/consoles/'),
                imgFullPath: path.join('/images/consoles/', file.originalname)
            });

              newConsole.save(function (err, game) {
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

 var consoleUpload = multer({
     storage: consoleStorage
 }).array("gameImg", 3); //Field name and max count


 var adminStorage = multer.diskStorage({
     destination: function(req, file, callback) {
        file.originalname = util.renameImage(file.originalname, req.body.username);
        let imgPath = path.join(__dirname, '../src/images/admins/');

         fs.exists(imgPath, exist => {
             if (!exist){
                fs.mkdir(imgPath , err => {
                    if (err)
                        console.log(err);
                });
             }

                console.log(req.body.username);

                  var newUser = new User ({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    status: "Activo",
                    roles: "Admin",
                    imgName: file.originalname,
                    imgPath: path.join('/images/admins/'),
                    imgFullPath: path.join('/images/admins/', file.originalname)
                   });

                   

                  newUser.save(function (err, user) {
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

 var adminUpload = multer({
     storage: adminStorage
 }).array("gameImg", 3); //Field name and max count



export default {
    router
};
module.exports = router;
