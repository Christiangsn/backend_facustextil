const Client = require('../models/client');
const mongoose = require('mongoose');
const Errors = require('../errors/Exception/requestException/index');
const bcrypt = require('bcryptjs');
const generationToken = require('../config/authToken');
const crypto = require('crypto');
const sgMail = require('../modules/mail');


class ClientController { 

    static async store (req, res, next) {
        const email  = req.body.email;

        const exists = await Client.findOne({ email })
        if (exists) 
            return next (Errors.BadException('Email already exists'))
  
        const user = await Client.create(req.body);
        user.password = undefined;

        return res.status(204).send({
            user,
            token: generationToken({ id: user.id}),
        })    
    }

    static async authenticate (req, res, next) {
        const email = req.body.email;
        const password = req.body.password;

        const user = await Client.findOne({ email }).select('+password');
        if (!user) 
            return next (Errors.NotFoundException('User not found'))

        if (!await bcrypt.compare(password, user.password))
            return next (Errors.BadException('Password Invalid'))

        user.password = undefined;

        return res.send({
            user,
            token: generationToken({ id: user.id}),
        })    
    }

    static async profile (req, res, next) {
        const id  = req.userId

        if (!mongoose.isValidObjectId(id)) 
            return next (Errors.ConflictException('User validation error'))
       
        const user = await Client.findById(id).select('+password name email')  
        user.id = undefined;

        return res.send({ user })  
    }

    static async update (req, res, next) {
        const id  = req.userId
        const inf = req.body

        if (!mongoose.isValidObjectId(id))
            return next (Errors.BadException('User validation error'))

        const user = await Client.findById(id).select('+password name email')

        if(!user)
           return next (Errors.NotFoundException('User not found'))

        if( id != user.id)
            return next (Errors.ForbiddenException('User validation error'))

        user.set(inf)
        await user.save()

        const updated = await Client.findById(id).select('+password')
        return res.status(200).json(updated) 
    }

    static async forgotPassword (req, res, next) {
        const email = req.body

        const user = await Client.findOne(email);
        if (!user) 
            return next (Errors.NotFoundException('User not found'))
        
        const token = crypto.randomBytes(10).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() +1);

        await Client.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        })

        const message  = {
            to: email,
            from: {
                email: "christianguimaraes1996@gmail.com"
            },
            subject: 'Forgot Password',
            text: `hello, <br> Your code token is: ${token}`,
            html: `<p>hello, <br> Your code token is:<b> ${token} </b></p>`,

        }
        sgMail.send(message)
        
        return res.send();
    }

    static async resetPassword (req, res, next) {
        const { email, token, password} = req.body

        const user = await Client.findOne({email}).select('+passwordResetToken passwordResetExpires')

        if (!user) 
            return next (Errors.NotFoundException('User not found'))

        if (token !== user.passwordResetToken)
           return next (Errors.BadException('token invalid'))

        const now = new Date();

        if (now > user.passwordResetExpires)
            return next (Erros.UnauthorizedException('Token expired, generate a new one'))
        
        user.password = password;
        await user.save();   
        res.send();
    }





    static async indexClient (req, res, next) {
        const query = Client.find()

        if (req.query.email) {
            query.where('email').equals(req.query.email)
        }
        if (req.query.orderByDate) {
            query.sort('createdAt')
        }

        const costumers = await query.select('+password').exec()

        return res.status(200).json(costumers)   
    }

}

module.exports = ClientController