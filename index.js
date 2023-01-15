const express = require('express')
const mongo = require('mongodb');
const app = express()
const port = process.env.PORT || 3000
const mongoUrl = process.env.MONGO_URL

let client;
let collection;
app.use(express.json());

app.post('/:key', async (req, res) => {
    const val = req.body.val
    await collection.insertOne({
        key:req.params.key,
        val
    })
    res.send('ok')
})

app.get('/:key', async (req, res) => {
    const webTriggerUrl = (await collection.findOne({ key: req.params.key })).val
    res.send(webTriggerUrl)
})

app.listen(port, async () => {
  client = await mongo.MongoClient.connect(mongoUrl)
  let db = client.db("main");
  collection = db.createCollection("kv-api")
  console.log(`Example app listening on port ${port}`)
})