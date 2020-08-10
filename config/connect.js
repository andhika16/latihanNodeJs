const mongoose = require('mongoose');

function connect(keys, name) {
    mongoose.connect(keys, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then((result) => {
            console.log(`database ${name} terhubung`);
        })
        .catch(err => console.log(err));
}

module.exports = connect;