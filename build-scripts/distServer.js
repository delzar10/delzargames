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

mongoose.connect(process.env.PROD_MONGODB || 'mongodb://localhost/mydb');

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
app.use(session({secret: 'library'}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', './src');
app.set('view engine', 'ejs');
//app.engine('.ejs', ejs);// <-- this does the trick

app.use('/', rootRouter);
app.use('/Books', bookRouter);
app.use('/Console', consoleRouter);

// Excepciones a la regla de no console en este archivo:
/* eslint-disable no-console */

app.listen(port, function(err){
    if (err){
        console.log(err);
    } else {
        console.log('Delzar Games is now running ...');
    }
})
