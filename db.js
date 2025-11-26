const mysql = require("mysql2");

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "cimatec",
    database: "taskflow"
});

module.exports = connection;
