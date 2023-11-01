const path = require('path');
const expressConfig = require('./business-logic/configuration/express');
const mongooseConfig = require('./business-logic/configuration/mongoose');

global.__appPath = __dirname;

require('dotenv').config({
    path: path.join(__dirname, '../.env'),
});

const PORT = process.env.PORT || 3055;
const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

const adminRouter = require('./api');

const expressApp = expressConfig();

expressApp.use('/admin', adminRouter);

mongooseConfig({ db_url: DATABASE_URL, db_name: DATABASE_NAME });

expressApp.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT} ...`);
});

expressApp.timeout = 500000;

module.exports = expressApp;