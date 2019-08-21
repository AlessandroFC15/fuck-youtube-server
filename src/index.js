import { port } from './config'
import app from './app'

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
