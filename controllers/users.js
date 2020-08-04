const login = (req, res) => {
    res.render('users/login', {
        title: 'User Login'
    })
}

const register = (req, res) => {
    res.render('users/register', {
        title: 'User Registration'
    })
}

const login_post = (req, res) => {

}

const register_post = (req, res) => {

}

module.exports = {
    login,
    register,
    login_post,
    register_post
}