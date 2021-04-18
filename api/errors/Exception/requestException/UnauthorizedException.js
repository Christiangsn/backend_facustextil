const HttpException = require("../../HttpException");

class UnauthorizedException extends HttpException {

    constructor(msg) {
        super(msg || 'Unauthorized', 401) 
    }

}

module.exports = UnauthorizedException
