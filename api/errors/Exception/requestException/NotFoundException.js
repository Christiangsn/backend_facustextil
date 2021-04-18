const HttpException = require("../../HttpException");

class NotFoundException extends HttpException {

    constructor(msg) {
        super(msg || 'Not Found', 404) 
    }

}

module.exports = NotFoundException