const express = require('express')
const app = express()
const MongoClient = require("mongodb").MongoClient
const PORT = 8000
require("dotenv").config

let db, dbConnectionStr = process.env.DB_STRING, dbName = 'samples'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
    .then(client => {
        console.log('Connected to ${dbName} Database')
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get("/", async(req, res) =>{
    const lotNumber = await db.collection('samples').find().toArray()
    const recommendedDilution = await db .collection('samples').find().toArray()
    const status = await db .collection('samples').find().toArray()
    const vendor = await db .collection('samples').find().toArray()
    const type = await db .collection('samples').find().toArray()
    const harvestDate = await db .collection('samples').find().toArray()
    const volume = await db .collection('samples').find().toArray()
    const dilutionFacotor = await db .collection('samples').find().toArray()
    const location = await db .collection('samples').find().toArray()

    response.render("index.ejs", { lot: lotNumber })
})
