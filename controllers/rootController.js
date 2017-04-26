var rootController = function(){
    var index = function(req, res){

    /*
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('X-Foo', 'bar');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('ok');

        var newGame = new Game
        ({ 
            title: 'Silence', 
            platform: 'XBOX-ONE',
            price: 10
        });

        newGame.save(function (err, fluffy) {
        if (err) return console.error(err);
        });

    */   
        Game.find(function (err, games) {
        if (err) return console.error(err);
        return res.render('../dist/index.html', {games: games});
        });

        console.log('TERMINAR')
        //res.render('../src/index.ejs');
        //res.sendFile(path.join(__dirname, '../src/index.html'));
    }
};

module.exports = rootController;
