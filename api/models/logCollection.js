const mongoose = require('../database/index');
const Schema = mongoose.Schema
const validator = require('validator');

const LogsSchema = new mongoose.Schema({ 

    request:{
        type: Schema.Types.ObjectId,
        ref: "Oders"       
    },
    EditBy: {
        type: Schema.Types.ObjectId,
        ref: "Client"
    },
    log: {
        type: String,
        require: true
    },
    EditAt: {
        type: Date,
        default: Date.now,
        minLength: 10, maxLength: 10,
        validate: (v) => validator.isDate(v, {format: 'YYYY/MM/DD'})
    }

})


const Logs = mongoose.model('Logs', LogsSchema);

module.exports = Logs;