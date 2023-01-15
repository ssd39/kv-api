const express = require('express')
const createClient = require('redis').createClient
const app = express()
const port = process.env.PORT || 3000
const redisUrl = process.env.REDIS_URL

app.use(express.json());

app.post('/:key', async (req, res) => {
    const val = req.body.val
    const redisCLient = createClient({
        url: redisUrl
    });
    await redisCLient.connect();
    await redisCLient.set(req.params.key , val);
    await redisCLient.disconnect();
})

app.get('/:key', async (req, res) => {
    const redisCLient = createClient({
        url: redisUrl
    });
    await redisCLient.connect();
    const webTriggerUrl = await client.get(req.params.key);
    console.log(webTriggerUrl)		
    await redisCLient.disconnect();
    res.send(webTriggerUrl)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})