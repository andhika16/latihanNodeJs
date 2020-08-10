const User = require('../model/users');


const userData = (req, res) => {
    User.find().sort({
            createdAt: -1
        })
        .then(result => {
            res.render('admin', {
                title: 'Data users',
                users: result
            })
        })
        .catch(err => {
            console.log(err)
        })
}

const userDetail = (req, res) => {
    const id = req.params.id
    User.findById(id).then(
        result => {
            res.render('admin/users', {
                title: 'user detail',
                user: result
            })
        }
    )
}

module.exports = {
    userData,
    userDetail
};