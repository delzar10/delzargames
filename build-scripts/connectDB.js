import mongoose from 'mongoose';

let url = "mongodb://delzar:DELzar_10@ds137110.mlab.com:37110/delzar-games";
//mongoose.connect('mongodb://localhost/mydb');
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Console Log Access Correct");
});

module.exports = mongoose;