const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const fetch = require('node-fetch')
const app = express()
const port = process.env.PORT || 3000
const mongoUrl = process.env.MONGO_URL

const client = new MongoClient(mongoUrl);
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
  await client.connect()
  let db = client.db("main");
  collection = db.collection('kv-api')
  setInterval(()=>{
    fetch('https://kv-api.onrender.com')
  }, 1000 * 60 * 5)
  console.log(`Example app listening on port ${port}`)
})