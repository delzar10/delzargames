 import mongoose from 'mongoose';

   var userSchema = new mongoose.Schema({
      name: {
        first: String,
        last: { type: String, trim: true }
      },
      age: { type: Number, min: 0 }
    });

    //declaration of models with respective schemas
    var User = mongoose.model('User', userSchema);

    module.exports={
     User:User
    }
