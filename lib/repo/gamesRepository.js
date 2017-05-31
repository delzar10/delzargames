import mongoose from 'mongoose';
import {Game}   from '../../model/Game';

let Schema = mongoose.Schema


class GamesRepository {
    constructor (){}

    getGames(callback) {
        console.log('*** GamesRepository.getGames');

        Games.find({}, {}, {sort: { name: 1 } }, (err, games) => {
            if (err){
                console.log(`*** GamesRepository.getGames err: ${err}`);
                return callback(err);
            }

            callback(null, games);
        });
    }

    getGame(gameId, callback){
        console.log('*** GamesRepository.getGames');
        Games.find({'id': gameId}, {}, (err, game) => {
            if (err){
                console.log(`*** GamesRepository.getGame err: ${err}`);
                return callback(err);
            }

            callback(null, game);
        });
    }
}
