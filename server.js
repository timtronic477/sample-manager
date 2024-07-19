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

    const samples = await db.collection("samples").find().toArray()
    // const lotNumber = await db.collection('samples').find().toArray()
    // const recommendedDilution = await db .collection('samples').find().toArray()
    // const status = await db .collection('samples').find().toArray()
    // const vendor = await db .collection('samples').find().toArray()
    // const type = await db .collection('samples').find().toArray()
    // const harvestDate = await db .collection('samples').find().toArray()
    // const volume = await db .collection('samples').find().toArray()
    // const dilutionFacotor = await db .collection('samples').find().toArray()
    // const location = await db .collection('samples').find().toArray()

    res.render("index.ejs", { sammples: samples})
})


app.post("/addSample", (req, res) => {
    db.collection("samples").insertOne({type: request.body.type, lotNumber: req.body.lotNumber, status: req.body.status})
    .then(res => {
        console.log('Sample Added')
        res.redirect("/")
    })
    .catch(error => console.log(error))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})
