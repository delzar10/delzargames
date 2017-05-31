   import mongoose from 'mongoose';

   var GameSchema = new mongoose.Schema({
      title:       { type: String, trim: true},
      platform:    { type: String, trim: true},
      price:       { type: Number, min:  0   },
      status:      { type: String, trim: true},
      articles:    { type: Number, min:  0   },
      imgPath:     { type: String, trim: true},
      imgName:     { type: String, trim: true},
      imgFullPath: { type: String, trim: true}
    });
    //declaration of models with respective schemas
    var Game = mongoose.model('Game', GameSchema, 'games');

module.exports = {
    Game: Game
}

