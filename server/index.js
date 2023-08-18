const express = require('express');
require('dotenv').config()
const app = express()
const morgan = require('morgan');
const cors = require('cors')
const conn = require('./db/conn');

const routes = require('./routes/routes')

app.use(express.urlencoded({ extended : true }))
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())


app.get('/api/security', (req,res) => {
    res.status(200).json({message: 'OK'})
})
const port = process.env.PORT || 3000

app.use('/api', routes)

conn.sync().then(() => {
app.listen(port, () => {

    console.log(`Server iniciado em http://localhost:3000`)
})
}).catch((err) => console.error(err));