const HttpException = require("./HttpException");

class NotFoundException extends HttpException {

    constructor() {
        super('User(s) not found!', 404)  
    }

}
module.exports = NotFoundException