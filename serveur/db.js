
const mysql = require('mysql2/promise');

let pool;

async function initializeConnection() {
    try {
        if (!pool) {
            pool = mysql.createPool({
                host: "sql7.freesqldatabase.com",
                port: '3306',
                user: "sql7714824",
                password: "pwaAKDb1rZ",
                database: "sql7714824",
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });
            console.log('Connected to MySQL');
        }
    } catch (err) {
        console.error('Failed to connect to MySQL:', err);
    }
}

async function getConnection() {
    if (!pool) {
        await initializeConnection();
    }
    return pool;
}



module.exports = { getConnection };

