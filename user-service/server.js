const {Client} = require('pg')

const port = 5432

const con = new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"chandan",
    database:"blog-platform"
})

con.connect().then(()=> console.log(`CONNECTED on port ${port}`))