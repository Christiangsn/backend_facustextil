const HttpException = require('../errors/HttpException')

module.exports = async (err, req, res, next) =>  {
    
    if (!err) { 
        return await next() 
    }
 
    if (err instanceof HttpException) {
        return res.status(err.status).send(err.message)
    }
    console.log(err)
 
    return res.status(500).send('Erro não identificado')

}