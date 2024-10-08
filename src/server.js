import path from 'path';
import { fileURLToPath } from 'url';

import createError from "http-errors";
import bodyParser from 'body-parser';

import express from 'express';
import session from 'express-session';

import passport from 'passport';

import livereload from 'livereload';
import connectLiveReload from 'connect-livereload';

import logger from 'morgan';

import config from './config.js'

// middlewares
import { rateLimit } from "./helpers/limiter.js";

// routes 
import allRoutes from './routes/root.js';

import db from './db/database.js';
import auth from './auth.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const reloadDB = false;

const cacheTime = 1000 * 60 * 30;

const liveReloadServer = livereload.createServer();

liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

const PORT = config.port ?? '3000';
const ENV = config.env ?? 'production';

const app = express();

app.use(connectLiveReload());

app.disable('x-powered-by');
app.disable('strict routing');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger((ENV !== "development") ? 'tiny' : 'dev'));

app.use(
    express.static(path.join(__dirname, "public"), {
        maxAge: cacheTime,
        immutable: (ENV == 'development'),
    })
);

app.use(
    rateLimit({
        interval: 60 * 1000,
    })
);

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));

auth.init();
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/', allRoutes);

if (ENV !== 'development' && ENV !== 'test') {
    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        // render the error page
        res.status(err.status || 500);
        switch (res.status) {
            case 403:
                // render
                break;
            case 404:
                // render
                break;
            case 500:
                // render
                break;
            case 502:
                // render
                break;
            case 503:
                // render
                break;
            case 504:
                // render
                break;
            default:
                //render 500
                break;
        }
        res.render("errors/error500");
    });
}

db.sync({ force: ENV === 'production' ? false : reloadDB })
    .then(() => {
        app.listen(PORT, process.stdout.write('Server is running on port: ' + PORT + '\n'));
    });
