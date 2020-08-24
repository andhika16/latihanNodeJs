module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/users/login');
    },
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/about');
    },
    authRole: function (role) {
        return (req, res, next) => {
            if (user.role !== role) {
                res.status(401)
                return req.flash('error_msg', 'Your not allowed')
            }

            next();
        }
    }
};