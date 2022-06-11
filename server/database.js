const {createPool} = require('mysql')

const db = createPool({
    host:"localhost",
    user:"root",
    password:"password",
    database:"usersdb",
    connectionLimit: 10
})

db.query('select * from account', (err, result, fields) => {
    if(err){
        return console.log(err)
    }
    return console.log(result)
})