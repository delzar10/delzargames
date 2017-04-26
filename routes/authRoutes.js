import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

var router = express.Router();

router.route('/Auth');

router.get('/addBooks', function(req, res, next) {
    res.send('inserting books');
});

export default {};
module.exports = router;