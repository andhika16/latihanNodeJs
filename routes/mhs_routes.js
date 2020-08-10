const express = require('express');
const route = express.Router();
const {
    ensureAuthenticated
} = require('../config/auth');
const {
    mhs_create,
    mhs_index,
    mhs_detail,
    mhs_create_get,
    mhs_delete,
    mhs_update
} = require('../controllers/con_mhs');


route.get('/', ensureAuthenticated, mhs_index);
route.get('/tambahData', ensureAuthenticated, mhs_create_get)
route.post('/', ensureAuthenticated, mhs_create);
route.post('/ubah/:id', ensureAuthenticated, mhs_update)
route.get('/:id', ensureAuthenticated, mhs_detail);
route.delete('/:id', ensureAuthenticated, mhs_delete)




module.exports = route;