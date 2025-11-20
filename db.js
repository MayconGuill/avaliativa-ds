const mysql = require("mysql2");

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "cimatec",
    database: "aula2910"
});

module.exports = connection;
