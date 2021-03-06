const mysql = require('mysql');
const chalk = require('chalk');



connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'P4ssw0rd!',
    database: 'employee_db',
});

connection.connect((err) => {
    if (err) {
        console.log(chalk.white.bgRed(err));
        return;
    }

    console.log(chalk.green(`Success! The database is connected on Thread ID: ${connection.threadId}`));
})

module.exports = connection;