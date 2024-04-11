const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const connection = mysql.createConnection(config)

const sql = "INSERT INTO names(name) values('Raimundo')"
connection.query(sql)
const get_names_sql = "SELECT * FROM names"
let names = ""
connection.query(get_names_sql, (err , result) => {
    handleNames(Object.values(JSON.parse(JSON.stringify(result))))
    send()
})
connection.end()

function handleNames(result) {
    result.forEach( ({ id, name}) => {
        names += `<li>${name}</li>`
    })
}

function send() {
    app.get("/", (req, res) => {
        res.send(`
                    <h1>Full Cycle Rocks!</h1>
                    <h2>Lista de nomes:</h2>
                    <ol>
                        ${names}
                    </ol>
                    `)
    })
}


app.listen(port, () => {
    console.log(`running, port: ${port}`)
})