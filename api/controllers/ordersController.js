const oders = require('../models/orders');
const client = require('../models/client');
const NotOderException = require('../errors/NotOderException');
const NotFoundException = require('../errors/NotFoundException')
const log = require('../models/logCollection');

class OdersController {

    static async request (req, res, next) {
        
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
            .select('+id')
        if(!exists)3
           return next(new NotFoundException())

        const newRequest = { ...req.body, client: exists.id }
        const request = await oders.create(newRequest)

        const newLog = { request: request.id, EditBy: exists.id, log: req.body.orderSummary }
        await log.create(newLog)


        return res.status(204).json(request)    

    }

    static async indexRequest (req, res, next) {
        const query = oders.find()

        const requests = await query.exec()
        return res.status(200).json(requests)  

    }

    static async deletRequest (req, res, next) {

        const { id } = req.params
        const deleted = "Delete";
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
            .select('+id')
        if(!exists)
           return next(new NotFoundException())

        
        const newLog = { request: id, EditBy: exists.id, log: deleted }
        await oders.findByIdAndDelete(id).exec()
        await log.create(newLog)
        return res.status(204).send();
    }
    
    static async oneOder (req, res, next) {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) 
          return next(new InvalidFormat())
    
        const resultOder = await oders.findById(id) 
        if (!resultOder) 
        return next(new NotFoundException())

        return res.status(200).json(resultOder)    
    }

    static async editRequest (req, res, next) {

        const { id } = req.params
        const inf = req.body
        const existsRequest = await oders.findById(id)

        if(!existsRequest)
            next(new NotOderException())

        await oders.findByIdAndUpdate(id , inf).exec()
        const requestAt = await oders.findById(id);
        return res.status(200).json(requestAt) 

    }

    static async indexLogs (req, res, next) {
        const query = log.find()

        const Logs = await query.exec()
        return res.status(200).json(Logs)  

    }


}

module.exports = OdersController;