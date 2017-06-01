// Module dependencies
import mongoose        from 'mongoose';
import dbConfiguration from './configLoader';

let dbConfig = dbConfiguration.databaseConfig;
let connectionString =  'mongodb://' + dbConfig.host + '/' + dbConfig.database;
let connection = null;

class Database {

    open(callback) {
        const options = {};
        console.log(connectionString);
        console.log('mongodb://<dbuser>:<dbpassword>@ds151451.mlab.com:51451/delzar-games-development')
        console.log('mongodb://delzar:DELzar_10@ds137110.mlab.com:37110/delzar-games')
        mongoose.connect(connectionString, options, (err) => {
            if (err) {
                console.log('mongoose.connect() failed: ' + err);
            }
        });
        connection = mongoose.connection;
        mongoose.Promise = global.Promise;

        mongoose.connection.on('error', (err) => {
            console.log('Error connecting to MongoDB: ' + err);
            callback(err, false);
        });

        mongoose.connection.once('open', () => {
            console.log('We have connected to mongodb');
            callback(null, true);
        });

    }

    // disconnect from database
    close() {
        connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    }

}

export const database = new Database();
