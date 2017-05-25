import express from 'express';
import mongoose from 'mongoose';
import {Game} from '../model/Game';

var router = express.Router();

router.route('/Console');

router.param('name', function(req, res, next, name) {
    // do validation on name here
    // blah blah validation
    // log something so we know its working
    console.log('doing name validations on ' + name);

    // once validation is done save the new item in the req
    req.name = name;
    // go to the next thing
    next(); 
});

router.get('/:name', function(req, res) {

     Game.find({ platform: req.name }).limit(12).exec(function (err, games) {
          if (err) return console.error(err);
          res.render('../src/views/console-gallery.ejs', {games: games, console: req.name});
     });
});

/*
router.get('/PS3', function(req, res, next) {

     Game.find({ platform: 'PS3' }).limit(12).exec(function (err, games) {
          if (err) return console.error(err);
          res.render('../src/views/console-gallery.ejs', {games: games, console: 'PS3'});
     });
});

router.get('/PS4', function(req, res, next) {
     Game.find({ platform: 'PS4' }).limit(12).exec(function (err, games) {
          if (err) return console.error(err);
          res.render('../src/views/console-gallery.ejs', {games: games, console: 'PS4'});
     });
});

router.get('/XBOX-ONE', function(req, res, next) {
    Game.find({ platform: 'XBOX-ONE' }).limit(12).exec(function (err, games) {
          if (err) return console.error(err);
          res.render('../src/views/console-gallery.ejs', {games: games, console: 'XBOX-ONE'});
     });
});

router.get('/XBOX-360', function(req, res, next) {
     Game.find({ platform: 'XBOX-360' }).limit(12).exec(function (err, games) {
          if (err) return console.error(err);
          res.render('../src/views/console-gallery.ejs', {games: games, console: 'XBOX-360'});
     });
});

router.get('/3DS', function(req, res, next) {
     Game.find({ platform: '3DS' }).limit(12).exec(function (err, games) {
          if (err) return console.error(err);
          res.render('../src/views/console-gallery.ejs', {games: games, console: '3DS'});
     });
});

router.get('/WIIU', function(req, res, next) {
         Game.find({ platform: 'WIIU' }).limit(12).exec(function (err, games) {
          if (err) return console.error(err);
          res.render('../src/views/console-gallery.ejs', {games: games, console: 'WIIU'});
     });
});

router.get('/SWITCH', function(req, res, next) {
     Game.find({ platform: 'SWITCH' }).limit(12).exec(function (err, games) {
          if (err) return console.error(err);
          res.render('../src/views/console-gallery.ejs', {games: games, console: 'SWITCH'});
     });
});
*/

export default {};
module.exports = router;
