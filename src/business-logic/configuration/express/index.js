const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const contextService = require('request-context');
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');


const expressConfig = () => {
    const app = express();

    // swagger docs
    let swaggerDocument = {};

    let swaggerinfo = fs.readFileSync("./src/business-logic/swagger/index.yaml", "utf8");
    let admin_endpoints = fs.readFileSync("./src/business-logic/swagger/endpoints/admin.yaml", "utf8"); 

    Object.assign(swaggerDocument, YAML.parse(swaggerinfo));
    Object.assign(swaggerDocument.paths = {}, YAML.parse(admin_endpoints));

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


    let options = {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204,
    }

    app.use(cors(options));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(contextService.middleware('request'));
    
    return app;
};

module.exports = expressConfig;