const HttpException = require("../../HttpException");

class ForbiddenException extends HttpException {

    constructor() {
        super(msg || 'Forbidden', 403) 
    }

}

module.exports = ForbiddenException
