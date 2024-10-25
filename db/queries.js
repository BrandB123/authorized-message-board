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

module.exports = {addUser}