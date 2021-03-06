const mongoose = require('../database/index');
const Schema = mongoose.Schema
const validator = require('validator');
const bcrypt = require('bcryptjs')


const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        name: String,
        size: Number,
        key: String,
        url: String,
        createdAt: {
            type: Date,
            default: Date.now
        },
        require: false
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    telephone: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{2} (\d{1} )?\d{4}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    dateOfBirth: {
        type: Date,
        minLength: 10, maxLength: 10,
        validate: (v) => validator.isDate(v, {format: 'YYYY/MM/DD'})
    },
    address: { 
        type: String,
        require: true

    },
    complement: {
        type: String,
        require: true
    },
    district: {
        type: String,
        require: true
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    oders:[{
        type: Schema.Types.ObjectId,
        ref: "Oders",
        select: false        
    }],
    logs:[{
        type: Schema.Types.ObjectId,
        ref: "Logs",
        select: false
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        minLength: 10, maxLength: 10,
        select: false,
        validate: (v) => validator.isDate(v, {format: 'YYYY/MM/DD'})
    }
})

ClientSchema.pre('save', function(next) {
    const user = this;
    SALT_WORK_FACTOR = 10,
    REQUIRED_PASSWORD_LENGTH = 8;
    if(!user.image.url) {
        user.image.url = `http://localhost:3000/files/${user.image.key}`;
    }
    
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
           
            user.password = hash;
            next();
        });
    });
   
});



const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;