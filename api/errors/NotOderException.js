const HttpException = require("./HttpException");

class NotOderException extends HttpException {

    constructor() {
        super('Order not registered or not found!', 404)  
    }

}
module.exports = NotOderException


