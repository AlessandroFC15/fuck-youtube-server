import express from 'express'

const app = express()

app.get('/', function (req, res) {
  res.send(JSON.stringify({ Hello: 'World' }))
})

export default app
