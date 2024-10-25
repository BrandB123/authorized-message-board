const pool = require('./pool');

async function addUser(name, email, hashedPassword){
    try {
        await pool.query(`
        INSERT INTO users (name, username, password, member, admin)
        VALUES ($1, $2, $3, false, false)`, 
        [name, email, hashedPassword])
        console.log("User added to database.")
    } catch(err) {
        console.error("Error adding user: ", err)
    }
}

async function addMember(username){
    try {
        const { rows } = await pool.query(`SELECT * FROM users WHERE username = $1`, [username])
        await pool.query(`UPDATE users SET member = true WHERE id = $1`, [rows[0].id])
    } catch(err) {
        console.error("Error adding member: ", err)
    }
}

module.exports = {addUser, addMember}