const User = require('../model/users');
const bcrypt = require('bcrypt');
const passport = require('passport');

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
// register handle
const register_post = (req, res) => {
    const errors = [];
    const {
        name,
        email,
        password,
        password2
    } = req.body;


    if (!name || !email || !password || !password2) {

        errors.push({
            msg: 'Field harus diisi'
        });

    }

    if (password !== password2) {
        errors.push({
            msg: 'Password not match !'
        })
    }

    if (password.length < 3) {
        errors.push({
            msg: 'Password too short'
        })
    }

    if (errors.length > 0) {
        res.render('users/register', {
            title: 'User Registration',
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        // validation passed
        User.findOne({
                email: email
            }).then(user => {
                if (user) {
                    // User exist
                    errors.push({
                        msg: 'Email Is Registered'
                    });
                    res.render('users/register', {
                        title: 'User registration',
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;

                            newUser.save()
                                .then(result => {
                                    req.flash(
                                        'success_msg',
                                        'You are now registered'
                                    );
                                    res.redirect('/users/login');
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        })
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })

    }



}
// login handler
const login_post = (req, res, next) => {



    passport.authenticate('local', (err, user) => {
        if (user) {
            if (err) return next(err);
            if (user.role === 'admin') {
                return res.redirect('/about');
            } else if (user.role === 'user') {
                return res.redirect('/mahasiswa');
            }
        } else {
            res.redirect('/users/login');
            req.flash('error_msg', 'Please wrong password')
        }
    })(req, res, next);


};
// logout handler
const logout = (req, res) => {
    req.logOut();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login')
};


module.exports = {
    login,
    register,
    login_post,
    register_post,
    logout
}


// {
//     successRedirect: '/about',
//     failureRedirect: '/users/login',
//     failureFlash: true
// }