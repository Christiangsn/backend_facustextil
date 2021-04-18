const HttpException = require("../../HttpException");

class UnprocessableEntity extends HttpException {

    constructor() {
        super(msg || 'Unauthorized', 422)
    }

}

module.exports = UnprocessableEntity