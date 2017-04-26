import mongoose from 'mongoose';


//mongoose.connect('mongodb://localhost/mydb');
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Console Log Access Correct");
});

module.exports = mongoose;