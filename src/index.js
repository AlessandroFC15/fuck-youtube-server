import express from 'express'
import { port } from './config'

const app = express()

app.get('/', function (req, res) {
  res.send(JSON.stringify({ Hello: 'World' }))
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
