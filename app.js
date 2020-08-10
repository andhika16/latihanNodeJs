"use strict"
const express = require('express');
const app = express();
const port = 3000;
const flash = require('connect-flash');
const expresslayout = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const dbase = require('./config/connect');
// passport auth
require('./config/passport')(passport)

app.listen(port, () => {
    console.log(`Server terhubung ${port}`)
});
// middleware
app.use(expresslayout);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
// layout
// app.set('layout', 'LPublic');


// session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// flash middleware flash
app.use(flash());

// global var
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();

});
// router
app.use('/mahasiswa', require('./routes/mhs_routes'));
app.use('/users', require('./routes/users'));
app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes/index'));
// connect to database
const db_mhs = require('./config/keys');
const db_users = require('./config/keys');
dbase(db_mhs, 'mahasiswa');
dbase(db_users, 'users');