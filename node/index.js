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

const get_names_sql = "SELECT * FROM people"
let names = ""
connection.query(get_names_sql, (err , result) => {
    console.log(err, result)
    if (result) {
        handleNames(Object.values(JSON.parse(JSON.stringify(result))))
    }
    send()
})

function handleNames(result) {
    names = ""
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
        insert()
    })
}

function insert() {
    const sql = "INSERT INTO people(name) values('Raimundo')"
    connection.query(sql)
    connection.query(get_names_sql, (err , result) => {
        console.log(err, result)
        if (result) {
            handleNames(Object.values(JSON.parse(JSON.stringify(result))))
        }
    })
}

app.get("/health", (req, res) => {
    res.send(`
                <h1>Heath!</h1>
                `)
})

app.listen(port, () => {
    console.log(`running, port: ${port}`)
})