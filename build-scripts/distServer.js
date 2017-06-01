//const ejs = require("ejs").__express;
import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import rootRouter from '../routes/rootRoutes';
import bookRouter from '../routes/bookRoutes';
import consoleRouter from '../routes/consoleRoutes';
import mongoose from 'mongoose';

mongoose.connect(process.env.PROD_MONGODB || 'mongodb://delzar:DELzar_10@ds137110.mlab.com:37110/delzar-games' || 'mongodb://localhost/mydb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Console Log Access Correct");
});

const port = (process.env.PORT || 8080);
const app = express();

app.use(compression());
app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 }
}));

app.set('views', './src');
app.set('view engine', 'ejs');
//app.engine('.ejs', ejs);// <-- this does the trick

app.use('/**', isAuthenticated);
app.use('/', rootRouter);
app.use('/Books', bookRouter);
app.use('/Console', consoleRouter);


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
/* eslint-disable no-console */

app.listen(port, function(err){
if (err){
        console.log(err);
    } else {
        console.log("delzar-games is running...");
    }

    app.locals.cart = [];
})
