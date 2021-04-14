const express = require('express');
const routes = require('./routes');
const TryCatch = require('./middlewares/GlobalExceptionHandler')
const AuthBase = require('./middlewares/auth');
const basicAuth = require('express-basic-auth')


const app = express();

const port = 3000;
routes(app)
app.use(TryCatch)
app.use(basicAuth({ authorizer: AuthBase }))

app.listen(port, () => console.log(`SEVER ON ${port}`))

module.exports = app