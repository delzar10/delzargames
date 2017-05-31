 import mongoose from 'mongoose';

   var userSchema = new mongoose.Schema({
        person: {
          name: {
            firstName: { type: String, trim: true },
            lastName:  { type: String, trim: true }
          },
          address: {
            street: {type: String, trim: true},
            number: {type: Number}
          },
          birth: {type: Date},
          cellphone: {type: Number},
          telephone: {type: Number},
        },
        username: {type: String, trim: true},
        email:    {type: String, trim: true},
        password: {type: String, trim:true, },
        status:   {type: String, trim: true},
        roles: {
            name: [{type: String, trim: true}]
        },
        creditCard: [{
          cardType: {type: String},
          cardNumber: {type: Number},
          cardCode: {type: Number}
        }],
        imgPath: { type: String, trim: true},
        imgName: { type: String, trim: true},
        imgFullPath: { type: String, trim: true}
    });

    //declaration of models with respective schemas
    var User = mongoose.model('User', userSchema);

    module.exports={
     User:User
    }
