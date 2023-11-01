const mongoose = require('mongoose');

const mongooseConfig = (data) => {
    const { db_url, db_name } = data;

    mongoose.set('debug', true);
    console.log("Connecting to the host: " + db_url + " and database: " + db_name);

    return new Promise((resolve, reject) => {
        mongoose.connect(db_url, { dbName: db_name })
            .then((res) => {
                console.log("Connected to the host: " + mongoose.connection.host + " and database: " + mongoose.connection.db.databaseName);
                resolve(res);
            })
            .catch((err) => {
                console.log('Error connecting to MongoDB');
                console.log(err);
                reject(err);
            });
    });
}

module.exports = mongooseConfig;