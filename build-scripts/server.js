import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, // No especial info
    publicPath: config.output.publicPath // Public path
}));

app.get('/users', function(req, res){
    res.json([
        {"id": 1, "firstName":"Bob","lastName":"Smith", "email":"bob@gmail.com"},
        {"id": 2, "firstName":"Tammy","lastName":"Glendal", "email":"tammy@gmail.com"},
        {"id": 3, "firstName":"Tina","lastName":"Jenner", "email":"tina@gmail.com"},
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
})
