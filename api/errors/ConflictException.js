const HttpException = require("./HttpException");

class ConflictException extends HttpException {
 
    constructor() {
        super('Email already registered', 409)
    }
    
}

module.exports = ConflictException