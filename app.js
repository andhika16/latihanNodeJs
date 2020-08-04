const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const flash = require('connect-flash');
const expresslayout = require('express-ejs-layouts')

// middleware
app.use(expresslayout);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
// flash middleware flash
app.use(flash());


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