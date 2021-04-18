const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://Christian_textil:dbChristianTextil@cluster0.cqsf4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.on('connected', () => {
    console.log('MongoDB ON')
})
mongoose.Promise = global.Promise;

module.exports = mongoose;