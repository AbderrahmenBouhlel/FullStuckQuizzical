const mysql = require('mysql2/promise');

let pool;

async function initializeConnection() {
    try {
        pool = mysql.createPool({
            host: "127.0.0.1",
            port: "3306",
            user: "root",
            password: "awsweldalonso123",
            database: "quizz_app",
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        console.log('Connected to MySQL');
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
