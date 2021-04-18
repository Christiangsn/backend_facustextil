const express = require('express');
const routes = require('./routes');
const TryCatch = require('./middlewares/GlobalExceptionHandler')

const app = express();

const port = 3000;
routes(app)
app.use(TryCatch)

app.listen(port, () => console.log(`SEVER ON ${port}`))

module.exports = app