const mysql = require("mysql2");

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "33410260",
    database: "taskflow"
});

module.exports = connection;
