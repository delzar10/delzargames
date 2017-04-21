import express from 'express';
var router = express.Router();

router.route('/Books');

router.get('/addBooks', function(req, res, next) {
    res.send('inserting books');
});

export default {};
module.exports = router;
