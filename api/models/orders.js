const mongoose = require('../database/index');
const Schema = mongoose.Schema
const validator = require('validator');


const OdersSchema = new mongoose.Schema({ 

    client: {
        type: Schema.Types.ObjectId,
        ref: "Client"
    },
    orderSummary: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        minLength: 10, maxLength: 10,
        validate: (v) => validator.isDate(v, {format: 'YYYY/MM/DD'})
    }
})


const Oders = mongoose.model('Oders', OdersSchema);

module.exports = Oders;