import mongoose from 'mongoose';


mongoose.connect(process.env.PROD_MONGODB || "mongodb://localhost/mydb");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Console Log Access Correct");
});

module.exports = mongoose;