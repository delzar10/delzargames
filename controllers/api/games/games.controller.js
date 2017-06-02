import util      from 'util';
import {gamesRepo} from '../../../lib/repo/GamesRepository';

class GamesController {

    constructor(router) {
        router.get('/', this.getGames.bind(this));
        router.get('/:id', this.getGame.bind(this));
        router.get('/best-selled', this.getBestSelledGames.bind(this));
    }

    getGame(req, res) {
        console.log('*** getGame ***');
        gamesRepo.getGame(req.params.id, (err, data) => {
            if (err) {
                console.log('*** getGame error: ' + util.inspect(err));
                res.json({
                    game: null
                });
            } else {
                console.log('*** getGame ok');
                res.json(data);
            }
        });
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

    getBestSelledGames(req, res) {
        console.log('*** getBestSelledGames ***');

        gamesRepo.getBestSelledGames((err, data) => {
            if (err) {
                console.log('*** getBestSelledGames error: ' + util.inspect(err));
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
