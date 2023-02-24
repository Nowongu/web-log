import sqlite3 from 'sqlite3'
import dotenv from 'dotenv'
//import md5 from 'md5'

class MyDatabase
{
    public connection: sqlite3.Database

    constructor() {
        dotenv.config();
        const dbsource = <string>process.env.DBSOURCE
        this.connection = new sqlite3.Database(dbsource, this.handleConnection)
    }

    private handleConnection = (err: Error | null) => {
        if (err) {
            console.error(err.message)
            throw err
        }

        console.log('Connected to the SQLite database.')

        //create user table
        // db.run(`CREATE TABLE user (
        //     id INTEGER PRIMARY KEY AUTOINCREMENT,
        //     name text, 
        //     email text UNIQUE, 
        //     password text, 
        //     CONSTRAINT email_unique UNIQUE (email)
        //     )`,
        // (err) => {
        //     if (err) {
        //         // Table already created
        //     }else{
        //         // Table just created, creating some rows
        //         var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
        //         //db.run(insert, ["admin","admin@example.com",md5("admin123456")])
        //         //db.run(insert, ["user","user@example.com",md5("user123456")])
        //     }
        // });  

        //create log table
        this.connection.run(`CREATE TABLE IF NOT EXISTS log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            time STRING, 
            message TEXT
            )`)
    }


    public write_log = (message: string) => {
        const query = `INSERT INTO log (time, message) VALUES (?, ?)`
        this.connection.run(query, [new Date().toISOString(), message])
    }
    
    public clear_log = () => {
        const query = `DELETE FROM log`
        this.connection.run(query)
    }

    // public read_log = () : string[] => {
    //     const query = `SELECT * FROM log LIMIT 20`
    //     const result: string[] = []
    //     this.connection.all(query, result)
    //     return result
    // }
}

const db = new MyDatabase

export default db