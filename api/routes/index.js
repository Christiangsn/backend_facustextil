const bodyParser = require('body-parser');
const client = require('./clientRoute')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(client)
    
}