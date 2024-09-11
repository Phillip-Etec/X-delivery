const path = require('path');
const createError = require("http-errors");
const bodyParser = require('body-parser');

const express = require('express');
const session = require('express-session');

const passport = require('passport');

const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');

const logger = require('morgan');

// routes 
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const profileRoutes = require('./routes/profile');
const creditCardRoutes = require('./routes/creditcard');

//const errorHandler = require('./error-handler');
const db = require('./db/database');
const { init: initAuth } = require('./auth');
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

initAuth();
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

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    switch( res.status ) {
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
    res.render("errors/error404");
});

db.sync({ force: false })
    .then( () => {
        app.listen(PORT, console.log('Server is running on port: ' + PORT));
    } );
