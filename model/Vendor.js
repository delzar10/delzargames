   import mongoose from 'mongoose';

   var vendorSchema = new mongoose.Schema({
      name: { type: String, trim: true},
      imgPath: { type: String, trim: true},
      imgName: { type: String, trim: true},
      imgFullPath: { type: String, trim: true}
    });


    //declaration of models with respective schemas
    var Vendor = mongoose.model('Vendor', vendorSchema);

    module.exports={
     Vendor:Vendor
    }
