const route = require('express').Router();
const {
    ensureAuthenticated
} = require('../config/auth');


route.get('/', (req, res) => {
    res.render('welcome', {
        title: 'Home'
    });
});

route.get('/about', (req, res) => {
    res.render('about/about.ejs', {
        title: 'About'
    });
});
route.use((req, res, next) => {
    res.status(404).render('404', {
        title: '404'
    });

    next();
});



module.exports = route;