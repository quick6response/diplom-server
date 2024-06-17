require('ts-node/register');
const { db } = require('./application.config.js');

console.log(db);

module.exports = {
  development: {
    username: db.user,
    password: db.password,
    database: db.database,
    host: db.host,
    port: db.port,
    dialect: db.dialect,
  },
};
