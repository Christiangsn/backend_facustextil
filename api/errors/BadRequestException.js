const HttpException = require("./HttpException");

class BadRequestException extends HttpException {
 
    constructor() {
        super('Formato Invalido', 400)
    }
    
}

module.exports = BadRequestException
