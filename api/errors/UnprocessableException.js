const HttpException = require("./HttpException");

class UnprocessableEntity extends HttpException {

    constructor() {
        super('Informed data is outside the defined scope for the field!', 422)  
    }

}

module.exports = UnprocessableEntity