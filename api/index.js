const express = require('express');
const routes = require('./routes');
const TryCatch = require('./middlewares/GlobalExceptionHandler')
const cors = require('cors')

const app = express();

const port = 3000;
app.use(cors());
routes(app)
app.use(TryCatch)


app.listen(port, () => console.log(`SEVER ON ${port}`))

module.exports = app