const express = require('express');
const route = express.Router();
const {
    mhs_create,
    mhs_index,
    mhs_detail,
    mhs_create_get,
    mhs_delete,
    mhs_update
} = require('../controllers/con_mhs');


route.get('/tambahData', mhs_create_get)
route.post('/', mhs_create);
route.post('/ubah/:id', mhs_update)
route.get('/:id', mhs_detail);
route.delete('/:id', mhs_delete)
route.get('/', mhs_index);




module.exports = route;