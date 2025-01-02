const mongoose = require('mongoose')


function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT, )
        .then(() => console.log('Connected to DB'))
        .catch(err => console.log('Could not connect to DB', err));
}

module.exports = connectToDb;