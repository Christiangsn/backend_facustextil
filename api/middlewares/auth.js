const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth');
const Errors = require('../errors/Exception/requestException/index');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return next (Errors.UnauthorizedException('No token provided'))
    
    const parts = authHeader.split(' ')

    if(!parts.length === 2)
        return next (Errors.UnauthorizedException('Token error'))

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return next( new Unauthorized() );
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err)
            return next (Errors.UnauthorizedException('Token malformatted'))

        req.userId = decoded.id
        return next();
    })

};