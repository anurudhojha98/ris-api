const express = require('express');
const app = express();
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const bodyParser = require('body-parser');
const cors = require('cors');
const msg = require('./common/messages');
const path = require('./common/path');
const constant = require('./common/constants');
const config = require('./config/config');
const morgan = require('morgan');
const logger = require('morgan');
const winston = require('./logger');

require('dotenv').config();
const PORT = config.NODE_PORT;
const corsOptions = {
    origin: config.ORIGIN_URL,
    optionsSuccessStatus: config.OPTION_SUCCESS_STATUS,
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: config.BODY_PARSER_LIMIT }));
app.use(bodyParser.urlencoded({ extended: true, limit: config.BODY_PARSER_LIMIT }));

app.use(logger('dev'));
app.use(morgan('combined', { stream: winston.stream }));
const models = require("./db/models");


models.sequelize
    .sync()
    .then(() => {
        console.log(msg.DB_CONNECTION_SUCCESS);
    })
    .catch(err => {
        console.log(err, msg.DB_CONNECTION_ERR);
    });

require("./routes/AuthRoutes")(app, router);
const options = { customCss: constant.SWAGGER_CSS };
app.use(path.API_DOCS, swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.listen(PORT, () => {
    console.log(msg.SERVER_SUCCESS_MSG + PORT);
});

module.exports = app;
