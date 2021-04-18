const HttpException = require("../../HttpException");

class ConflictException extends HttpException {

    constructor() {
        super(msg || 'Conflict', 409) 
    }

}

module.exports = ConflictException;