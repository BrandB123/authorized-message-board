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

async function addMessage(title, timestamp, message, author){
    try{
	    await pool.query(`INSERT INTO messages (title, timestamp, messages, author)
			              VALUES ($1, $2, $3, $4)`,
			              [title, timestamp, message, author])
	    console.log("Added new message to the database.");
    } catch (err){
	    console.error("Error adding new message: ", err)
    }
}

async function getMessages(){
    const {rows} = await pool.query(`SELECT * FROM messages`);
    return rows
}

async function deleteMessage(id){
    try { 
        await pool.query(`DELETE FROM messages WHERE id = $1`, [id]);
        console.log("Message deleted from database")
    } catch (err){
        console.error("Error deleting message: ", err)
    }
}

module.exports = {addUser, addMember, addMessage, getMessages, deleteMessage}