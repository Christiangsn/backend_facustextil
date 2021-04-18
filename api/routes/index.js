const bodyParser = require('body-parser');
const client = require('./clientRoute')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(client)
    
}