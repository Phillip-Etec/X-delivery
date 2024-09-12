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

// routes 
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import profileRoutes from './routes/profile.js';
import creditCardRoutes from './routes/creditcard.js';

//import errorHandler from './error-handler';
import db from './db/database.js';
import auth from './auth.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

//const { initAuth } = auth.init;

const liveReloadServer = livereload.createServer();

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const app = express();
const PORT = 9516;

app.use( connectLiveReload() );

//app.use( errorHandler );
app.use( bodyParser.json() );
//app.use( express.urlencoded( {extended: false} ) );
app.use( bodyParser.urlencoded( {extended: true} ) );
app.set( 'view engine', 'pug' );

app.use( logger( "dev" ) );

app.use( express.static( path.join( __dirname, "public" ) ) )

auth.init();
app.use( session ({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}) );


app.use( passport.initialize() );
app.use( passport.session() );

app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', profileRoutes);
app.use('/', creditCardRoutes);

// catch 404 and forward to error handler
app.use( ( req, res, next ) => {
    next( createError( 404 ) );
});

//// error handler
//app.use(function (err, req, res, next) {
    //// set locals, only providing error in development
    //res.locals.message = err.message;
    //res.locals.error = req.app.get("env") === "development" ? err : {};

    //// render the error page
    //res.status(err.status || 500);
    //switch( res.status ) {
        //case 403:
            //// render
            //break;
        //case 404:
            //// render
            //break;
        //case 500:
            //// render
            //break;
        //case 502:
            //// render
            //break;
        //case 503:
            //// render
            //break;
        //case 504:
            //// render
            //break;
        //default:
            ////render 500
            //break;
    //}
    //res.render("errors/error404");
//});

db.sync({ force: false })
    .then( () => {
        app.listen(PORT, console.log('Server is running on port: ' + PORT));
    } );
