const Client = require('../models/client');

module.exports = (user, password) => {

    Client.find(user).then(user => {
        bcrypt.compare(password, user.password).then(comparison => {
            if(!comparison){
                return false;
            }
            return true;
        })
    })

}



