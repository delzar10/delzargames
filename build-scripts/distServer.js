import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

const port = 8080;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../dist/index.html'));
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
/* eslint-disable no-console */

app.listen(port, function(err){
    if (err){
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
})
