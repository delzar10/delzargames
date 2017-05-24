import mongoose from 'mongoose';

    var articleStatusSchema = new mongoose.Schema({
      name: { type: String, trim: true},
    });

    //declaration of models with respective schemas
    var ArticleStatus = mongoose.model('ArticleStatus', articleStatusSchema);

    module.exports={
     ArticleStatus:ArticleStatus,
    }
