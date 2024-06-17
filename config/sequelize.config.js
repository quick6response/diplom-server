const fs = require('fs');
const { db } = require('./application.config.ts');

console.log(db);

module.exports = {
  development: {
    username: db.user,
    password: db.password,
    database: db.database,
    host: db.host,
    port: db.port,
    dialect: db.dialect
  }
};