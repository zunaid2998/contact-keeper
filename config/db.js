const mongoose = require('mongoose')
const config = require('config')
const mongoURI = config.get('mongoURI')

const connectDB = () => {
    mongoose.connect(mongoURI, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true
    })
    .then(() => console.log('mongoDB connected'))
    .catch(err => {
        console.error(err.message)
        process.exit(1)
    })
}

module.exports = connectDB