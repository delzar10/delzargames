import mongoose from 'mongoose';
import {Game}   from '../../model/Game';

class GamesRepository {
    constructor() {

    }

    getGames(callback) {
        console.log('*** GamesRepository.getGames ***');

        Game.find({}, (err, games) => {
            if (err){
                console.log(`*** GamesRepository.getGames err: ${err}`);
                return callback(err);
            }

            callback(null, games);
        });
    }

    getGame(gameId, callback){
        console.log('*** GamesRepository.getGames');
        console.log('gameId: ' + gameId);
        Game.find({'_id': gameId}, (err, game) => {
            if (err){
                console.log(`*** GamesRepository.getGame err: ${err}`);
                return callback(err);
            }

            callback(null, game);
        });
    }

    getBestSelledGames(callback) {
        console.log('*** GamesRepository.getBestSelledGames');

        Game.find({}, (err, games) => {
            if (err){
                console.log(`*** GamesRepository.getBestSelledGames err: ${err}`);
                return callback(err);
            }

            callback(null, games);
        });
    }
}

export const gamesRepo = new GamesRepository();
