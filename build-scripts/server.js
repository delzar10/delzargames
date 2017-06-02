import path            from 'path';
import open            from 'open';
import csrf            from 'csurf';
import morgan          from 'morgan';
import helmet          from 'helmet';
import favicon         from 'serve-favicon';
import session         from 'express-session';
import express         from 'express';
import webpack         from 'webpack';
import mongoose        from 'mongoose';
import bodyParser      from 'body-parser';
import cookieParser    from 'cookie-parser';
import config          from '../webpack.config.dev';
import rootRouter      from '../routes/rootRoutes';
import bookRouter      from '../routes/bookRoutes';
import consoleRouter   from '../routes/consoleRoutes';
import errorhandler    from 'error-handler';
import {router}        from '../routes/router';
import {database}      from '../lib/database';

let port        = process.env.PORT || 8080;
let app         = express();
let compiler    = webpack(config);
let mongoClient = mongoose.MongoClient;

class DevServer {

    constructor() {
        this.initDataBase();
        this.initViewEngine();
        this.initExpressMiddleWare();
        this.initCustomMiddleware();
        this.initSecurity();
        this.initRoutes();
        this.start();
    }

    start() {
      app.listen(port, (err) => {
          console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, port);
      });
    }


    initViewEngine() {
        app.set('views', 'src');
        app.set('view engine', 'ejs');
    }

    initSecurity() {
        app.use(helmet());
        app.use(session({
            secret: 'keyboard cat',
            cookie: { maxAge: 6000 }
        }));
    }

    initExpressMiddleWare() {
        // a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
        app.use(require('webpack-dev-middleware')(compiler, {
            noInfo: true, // No especial info
            stats: { colors: true },
            publicPath: config.output.publicPath // Public path
        }));

        app.use(require("webpack-hot-middleware")(compiler, {
            log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
        }));


        //app.use(favicon(__dirname + '/public/images/favicon.ico'));
        //app.use(express.static('src'));
        //app.use(express.static(__dirname + 'src'));
        app.use(morgan('dev'));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(errorhandler);
        app.use(cookieParser());
        app.use(csrf({ cookie: true }));

        app.use((req, res, next) => {
            var csrfToken = req.csrfToken();
            res.locals._csrf = csrfToken;
            res.cookie('XSRF-TOKEN', csrfToken);
            next();
        });

        process.on('uncaughtException', (err) => {
            if (err) console.log(err, err.stack);
        });
    }

    initCustomMiddleware() {

        if (process.platform === "win32") {
            require("readline").createInterface({
                input: process.stdin,
                output: process.stdout
            }).on("SIGINT", () => {
                console.log('SIGINT: Closing MongoDB connection');
                database.close();
            });
        }

        process.on('SIGINT', () => {
            console.log('SIGINT: Closing MongoDB connection');
            database.close();
        });
    }

    initRoutes() {
        router.load(app, './controllers');

        app.use('/', rootRouter);
        app.use('/Books', bookRouter);
        app.use('/Console', consoleRouter);

        // redirect all others to the index (HTML5 history)
        /*app.all('/*', (req, res) => {
            res.sendFile(__dirname + '../src/views/index.html');
        });*/
    }

    initDataBase(){
        database.open((err, status) => {
            if (status === true){
                console.log("Connected to MongoDB");
            } else {
                console.log("Error Connecting to MongoDB");
                process.exit(1);
            }
        })
    }
}

var server = new DevServer();

module.exports = {
    server: server
}
