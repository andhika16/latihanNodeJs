const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const flash = require('connect-flash');
const expresslayout = require('express-ejs-layouts');
const session = require('express-session');

// middleware
app.use(expresslayout);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
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
app.use('/', require('./routes/index'));
// connect to database
const db_mhs = require('./config/keys')
mongoose.connect(db_mhs, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then((result) => {
        app.listen(port, () => {
            console.log(`mongodb connection on ${port}`)
        })
    })
    .catch(err => console.log(err))




// router
app.use('/mahasiswa', require('./routes/mhs_routes'));
app.use('/users', require('./routes/users'));
app.use('/', require('./routes/index'));