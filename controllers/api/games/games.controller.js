import util      from 'util';
import gamesRepo from '../../../lib/repo/GamesRepository';

class GamesController {

    constructor(router) {
        router.get('/', this.getGames.bind(this));
    }

    getGames(req, res) {
        console.log('*** getGames ***');

        gamesRepo.getGames((err, data) => {
            if (err) {
                console.log('*** getGames error: ' + util.inspect(err));
                res.json({
                    games: null
                });
            } else {
                console.log('*** getGames ok');
                res.json(data);
            }
        });
    }

}

module.exports = GamesController;
