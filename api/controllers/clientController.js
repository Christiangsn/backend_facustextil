const client = require('../models/client');
const mongoose = require('mongoose');
const InvalidFormat = require ('../errors/BadRequestException')
const NotFoundException = require('../errors/NotFoundException')
const ConflictException = require('../errors/ConflictException')

class ClientController { 

    static async store (req, res, next) {
        const email = req.body.email
        const exists = await client.exists({ email })
        
        if (exists) 
            return next(new ConflictException())

        const newClient = await client.create(req.body)
        return res.status(204).json(newClient)    

    }

    static async indexClient (req, res, next) {
        const query = client.find()

        if (req.query.email) {
            query.where('email').equals(req.query.email)
        }
        if (req.query.orderByDate) {
            query.sort('createdAt')
        }

        const costumers = await query.select('+password').exec()

        return res.status(200).json(costumers)   
    }

    static async deleteClient (req, res, next) {
        const { id } = req.params
        const authHeader = req.headers.authorization
    
        if (!authHeader) {
            const err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
                err.status = 401;
            next(err);
            return;
        }
        const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        const email = auth[0];
        const exists = await client.findOne({ email })
            .select('+id password')
        
        if(!exists)
           return next(new NotFoundException())

        if( id != exists.id)
          return next(new NotFoundException())
        
        await client.findByIdAndDelete(id).exec()
        return res.status(204).send();

    }

    static async editClient (req, res, next) {
        const { id } = req.params
        const inf = req.body
        const authHeader = req.headers.authorization

        if (!authHeader) {
            const err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
                err.status = 401;
            next(err);
            return;
        }
        const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        const email = auth[0];
        const exists = await client.findOne({ email })
            .select('+id name email password telephone dateOfBirth address complement district oders')
        
        if(!exists)
           return next(new NotFoundException())
        if( id != exists.id)
          return next(new NotFoundException())
        
        await client.findByIdAndUpdate(id , inf).exec()
        const clientAt = await client.findById(id);
        return res.status(200).json(clientAt)  
    }

    static async oneClient (req, res, next) {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) 
            return next(new InvalidFormat())
       
        const resultClient = await client.findById(id).select('+password')  
        if (!resultClient) 
            return next(new NotFoundException())

        return res.status(200).json(resultClient)    
    }



}

module.exports = ClientController