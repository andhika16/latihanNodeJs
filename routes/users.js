const router = require('express').Router();
const {
    login,
    register,
    login_post,
    register_post
} = require('../controllers/users')
router.get('/login', login)
router.get('/register', register)
router.post('/login', login_post)
router.post('/register', register_post)

module.exports = router;