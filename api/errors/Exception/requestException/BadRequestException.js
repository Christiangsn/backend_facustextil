const HttpException = require("../../HttpException");

class BadRequestException extends HttpException {

    constructor(msg) {
        super(msg || 'Bad Request', 400) 
    }

}

module.exports = BadRequestException





