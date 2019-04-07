const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/MovieAPI', {
        useNewUrlParser: true
    });

    mongoose.connection.on('open', () => {
        //console.info('MongoDB: Connected');
    });

    mongoose.connection.on('error', (err) => {
        console.info(`MongoDB Error : ${err}`);
    });

    //mongoose.set('useFindAndModify', false);
    mongoose.Promise = global.Promise;
}