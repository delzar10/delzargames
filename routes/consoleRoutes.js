import express from 'express';
import mongoose from 'mongoose';
import {Game} from '../model/Game';

var router = express.Router();

router.route('/Console');

router.get('/PS3', function(req, res, next) {

     Game.find({ platform: 'PS3' }, function (err, games) {
          if (err) return console.error(err);
          console.log(games);
          res.render('../dist/console-gallery.ejs', {games: games, console: 'PS3'});
     });
});

router.get('/PS4', function(req, res, next) {
     Game.find({ platform: 'PS4' }, function (err, games) {
          if (err) return console.error(err);
          console.log(games);
          res.render('../dist/console-gallery.ejs', {games: games, console: 'PS4'});
     });
});

router.get('/XBOX-ONE', function(req, res, next) {
    Game.find({ platform: 'XBOX-ONE' }, function (err, games) {
          if (err) return console.error(err);
          console.log(games);
          res.render('../dist/console-gallery.ejs', {games: games, console: 'XBOX-ONE'});
     });
});

router.get('/XBOX-360', function(req, res, next) {
     Game.find({ platform: 'XBOX-360' }, function (err, games) {
          if (err) return console.error(err);
          console.log(games);
          res.render('../dist/console-gallery.ejs', {games: games, console: 'XBOX-360'});
     });
});

router.get('/3DS', function(req, res, next) {
     Game.find({ platform: '3DS' }, function (err, games) {
          if (err) return console.error(err);
          console.log(games);
          res.render('../dist/console-gallery.ejs', {games: games, console: '3DS'});
     });
});

router.get('/WIIU', function(req, res, next) {
         Game.find({ platform: 'WIIU' }, function (err, games) {
          if (err) return console.error(err);
          console.log(games);
          res.render('../dist/console-gallery.ejs', {games: games, console: 'WIIU'});
     });
});

router.get('/SWITCH', function(req, res, next) {
     Game.find({ platform: 'SWITCH' }, function (err, games) {
          if (err) return console.error(err);
          console.log(games);
          res.render('../dist/console-gallery.ejs', {games: games, console: 'SWITCH'});
     });
});

export default {};
module.exports = router;