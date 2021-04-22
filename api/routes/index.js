const bodyParser = require('body-parser');
const client = require('./clientRoute');
const path = require('path');
const express = require('express');


module.exports = app => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use('/files', express.static(path.resolve(__dirname, '..' , 'public', 'files' )))
    app.use(client)
    
}