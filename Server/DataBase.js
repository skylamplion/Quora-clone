const mongoose = require('mongoose');
require('dotenv').config();



module.exports.connect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/quora', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

        .then(() => {
            console.log("MongoDB is connected")
        }).catch((e) => console.log(e));
}
