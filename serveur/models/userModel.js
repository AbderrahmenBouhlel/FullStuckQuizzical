// userModel.js

const {getConnection} = require("../db");

const User = {
    async create(requestObj) {
        try {
            const connection  = await getConnection();
            const name = requestObj.name || null;
            const email = requestObj.email || null;
            const password = requestObj.password || null;
            const role = requestObj._role || null;
            // Execute an SQL query to insert a new user into the users table
            const [result] =  await connection.execute(
                'INSERT INTO users (name, email, password, _role) VALUES (?, ?, ?, ?)',
                [name,email, password,role]
            );
            return result

        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },
    async findOne(requestObj) {
        try {
            const connection  = await getConnection();
            const email = requestObj.email ;
            const id = requestObj.id
            if (!email && !id) {
                throw new Error('Email or ID must be provided')
            }
            // Execute an SQL query to find a user in the users table
            let query = 'SELECT * FROM users WHERE ';
            const queryParms = [];
            if (email){
                query += ' email = ?'
                queryParms.push(email)
            }
            if (id){
                query += email ? ' OR' :''
                query += ' id = ?'
                queryParms.push(id)
            }
            const [rows] = await connection.execute(query ,queryParms);
            return rows.length > 0 ? rows[0] : null;
            
        } catch (error) {
            console.error('Error finding user:', error);
            throw error;
        }
    },

    async addScore(requestObj) {
 
        try {
            const connection= await getConnection();
            const score = requestObj.score ;
            const id = requestObj.id ;

            if (!score ) {
                throw new Error('score must be provided')
            }

            // Execute an SQL query to find a user in the users table
            let query = `UPDATE users SET score = score + ? WHERE ID = ?`;
            let queryParms = [score, id];
           
            
            
            const [result] = await connection.execute(query,queryParms);
            if (result.affectedRows === 0){
                throw new Error('No user found with the giver id ')
            }
            
            return { success: true, message: 'Score updated successfully' };
            
        } catch (error) {
            console.error('Error adding score:', error);
            throw error;
        } 
    }
};

module.exports = User;
