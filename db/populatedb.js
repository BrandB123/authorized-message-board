#! /usr/bin/env node

require('dotenv').config()
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ) NOT NULL,
    username VARCHAR ( 255 ) NOT NULL UNIQUE,
    password VARCHAR ( 255 ) NOT NULL,
    member BOOLEAN NOT NULL,
    admin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 255 ) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    messages VARCHAR ( 500 ) NOT NULL,
    author_id INTEGER REFERENCES users(id)
);
`;

async function main(){
    console.log("seeding...");
    try{
        const client = new Client({
            connectionString: process.env.CONNECTION_STRING,
        });
        await client.connect();
        await client.query(SQL);
        await client.end();
        console.log("done") 
    } catch(err){
        console.error(err)
    }
}