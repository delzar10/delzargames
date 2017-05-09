   import mongoose from 'mongoose';

   var gameSchema = new mongoose.Schema({
      title: { type: String, trim: true},
      platform: { type: String, trim: true},
      price: { type: Number, min: 0 },
      img: { data: Buffer, contentType: String }
    });

    //declaration of models with respective schemas
    var Game = mongoose.model('Game', gameSchema);

    module.exports={
     Game:Game
    }
