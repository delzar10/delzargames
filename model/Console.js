   import mongoose from 'mongoose';

   var consoleSchema = new mongoose.Schema({
      name: { type: String, trim: true},
      vendor: { type: String, trim: true},
      price: { type: Number, min: 1 },
      articles: {type: Number, min: 0},
      status: { type: String, trim: true},
      imgPath: { type: String, trim: true},
      imgName: { type: String, trim: true},
      imgFullPath: { type: String, trim: true}
    });

    //declaration of models with respective schemas
    var Console = mongoose.model('Console', consoleSchema);

    module.exports={
     Console:Console
    }
